# Safety script: kill any process listening on port 3000 and start server
$port = 3000
$net = netstat -ano | findstr ":$port"
if ($net) {
  $lines = netstat -ano | findstr ":$port"
  foreach ($l in $lines) {
    $parts = $l -split '\s+' | Where-Object { $_ -ne '' }
    $pid = $parts[-1]
    try { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue } catch {}
  }
}
npm start
