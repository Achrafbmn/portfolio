# Portfolio (local)

This is a small local portfolio server used to serve the static site and persist contact messages to `messages.json`.

Quick start

```bash
npm install
npm start
```

Environment variables (optional)

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — configure SMTP to receive email notifications
- `NOTIFY_TO` — email address that receives contact notifications

Notes

- `messages.json` is ignored by git. Backups are created automatically if the file is corrupted.
- For development consider installing `nodemon` globally or running `npm run dev` after installing dev dependencies.
