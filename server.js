const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const validator = require('validator');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic security & performance
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '200kb' }));
app.use(express.static(__dirname));

// Rate limiter for API endpoints
const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use('/api/', apiLimiter);

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, 'server.log') })
  ]
});

// Optional mail transporter (configure via env vars)
let transporter;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

// API endpoint to save messages
app.post('/api/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // basic validation
    if (!name || !email || !message) return res.status(400).json({ success: false, error: 'All fields are required' });
    if (!validator.isEmail(String(email))) return res.status(400).json({ success: false, error: 'Invalid email' });
    if (String(name).length > 200 || String(message).length > 2000) return res.status(400).json({ success: false, error: 'Input too long' });

    const newMessage = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString(),
      name,
      email,
      message
    };

    // Read existing messages with safe parsing and backup on corruption
    const messagesPath = path.join(__dirname, 'messages.json');
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      const data = fs.readFileSync(messagesPath, 'utf8');
      try {
        messages = JSON.parse(data);
        if (!Array.isArray(messages)) messages = [];
      } catch (parseError) {
        logger.warn(`messages.json parse error, creating backup and resetting: ${parseError}`);
        // backup corrupted file
        try {
          const bakName = `messages.json.bak.${Date.now()}`;
          fs.copyFileSync(messagesPath, path.join(__dirname, bakName));
        } catch (bakErr) {
          logger.error(`Failed to backup messages.json: ${bakErr}`);
        }
        messages = [];
      }
    }

    // Add new message at beginning
    messages.unshift(newMessage);

    // Save back to file using an atomic write
    try {
      const tmpPath = messagesPath + '.tmp';
      fs.writeFileSync(tmpPath, JSON.stringify(messages, null, 2), 'utf8');
      fs.renameSync(tmpPath, messagesPath);
    } catch (fsErr) {
      logger.error(`Failed writing messages.json: ${fsErr}`);
      throw fsErr;
    }

    logger.info(`New message received: ${name} <${email}>`);

    // if mail configured, notify owner
    if (transporter && process.env.NOTIFY_TO) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.NOTIFY_TO,
          subject: `New portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });
        logger.info('Notification email sent');
      } catch (mailErr) {
        logger.warn(`Failed to send notification email: ${mailErr}`);
      }
    }

    res.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('\x1b[31m❌ Error saving message:\x1b[0m', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.get('/api/messages', (req, res) => {
  let messages = [];
  if (fs.existsSync('messages.json')) {
    const data = fs.readFileSync('messages.json', 'utf8');
    messages = JSON.parse(data);
  }
  res.json(messages);
});

// Send index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔═════════════════════════════════════════════════╗
║                                                 ║
║   🚀 Portfolio Server running on port ${PORT}       ║
║                                                 ║
║   🌍 Website:   http://127.0.0.1:${PORT}           ║
║   📩 Messages:  http://127.0.0.1:${PORT}/api/messages ║
║                                                 ║
║   ✅ Contact form will save to messages.json     ║
║                                                 ║
╚═════════════════════════════════════════════════╝
  `);
});