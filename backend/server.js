// start the server
const app = require('./app');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

// load the .env variables
dotenv.config();
// connect to Database
connectdb();

//listening Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

// Start anti-cold-storage keep-alive self-pinger
const { startKeepAlive, stopKeepAlive } = require('./utils/keepAlive');
startKeepAlive();

// Graceful shutdown handling
const shutdown = () => {
  console.log('Gracefully shutting down...');
  stopKeepAlive();
  server.close(() => process.exit(0));
};

if (process.platform !== 'win32') {
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

