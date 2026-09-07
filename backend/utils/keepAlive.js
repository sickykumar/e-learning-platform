/**
 * Anti-Cold-Storage Self-Pinger Utility
 * 
 * Render free web services spin down after 15 minutes of inactivity.
 * This utility sends an automated HTTP GET request to its public health endpoint
 * every 5–10 minutes (default: 8 minutes) to simulate incoming traffic and prevent
 * the server from entering cold standby.
 */

let keepAliveInterval = null;
let retryTimeout = null;

function startKeepAlive() {
  if (keepAliveInterval) return;

  const rawUrl = process.env.SERVER_URL || process.env.RENDER_EXTERNAL_URL || 'https://e-learning-platform-api-nley.onrender.com';
  const baseUrl = rawUrl.replace(/\/$/, '');
  const healthUrl = `${baseUrl}/health`;

  const intervalMinutes = Math.max(1, parseInt(process.env.KEEP_ALIVE_INTERVAL_MINUTES || '8', 10));
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(`[KeepAlive] Automated keep-alive service initialized.`);
  console.log(`[KeepAlive] Target endpoint: ${healthUrl}`);
  console.log(`[KeepAlive] Heartbeat interval: Every ${intervalMinutes} minute(s).`);

  const pingServer = async (isRetry = false) => {
    const startTime = Date.now();
    try {
      const res = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'ELearning-AntiColdStorage-Heartbeat/1.0',
          'Accept': 'application/json'
        },
        // Timeout after 15 seconds
        signal: AbortSignal.timeout(15000)
      });

      const duration = Date.now() - startTime;

      if (res.ok) {
        console.log(`[KeepAlive] Heartbeat successful (Status: ${res.status}, Latency: ${duration}ms, Time: ${new Date().toLocaleTimeString()})`);
      } else {
        console.warn(`[KeepAlive] Server returned status ${res.status} after ${duration}ms`);
        scheduleRetry();
      }
    } catch (err) {
      console.warn(`[KeepAlive] Ping failed (${err.name}: ${err.message}). Scheduling retry...`);
      scheduleRetry();
    }
  };

  const scheduleRetry = () => {
    if (retryTimeout) clearTimeout(retryTimeout);
    // Retry in 30 seconds if ping failed
    retryTimeout = setTimeout(() => {
      console.log('[KeepAlive] Attempting retry ping...');
      pingServer(true);
    }, 30000);
  };

  // Initial warmup ping 10 seconds after boot
  setTimeout(() => {
    console.log('[KeepAlive] Executing initial startup heartbeat...');
    pingServer();
  }, 10000);

  // Periodic recurring heartbeat interval
  keepAliveInterval = setInterval(pingServer, intervalMs);
}

function stopKeepAlive() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
  }
  if (retryTimeout) {
    clearTimeout(retryTimeout);
    retryTimeout = null;
  }
  console.log('[KeepAlive] Automated keep-alive service stopped.');
}

module.exports = {
  startKeepAlive,
  stopKeepAlive
};
