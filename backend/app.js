const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const helmet = require('helmet').default;
const rateLimit = require('express-rate-limit').default;

const mongoose = require('mongoose');

const app = express();

// Format uptime into readable string
function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

// Generate health check status object
const getHealthStatus = () => {
  const uptimeSeconds = Math.floor(process.uptime());
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const readyState = mongoose.connection ? mongoose.connection.readyState : 0;
  const mem = process.memoryUsage();

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: formatUptime(uptimeSeconds),
    uptimeSeconds,
    database: {
      status: stateMap[readyState] || 'unknown',
      readyState
    },
    memory: {
      rssMB: Math.round(mem.rss / 1024 / 1024),
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024)
    },
    environment: process.env.NODE_ENV || 'production',
    service: 'e-learning-platform-api'
  };
};

// Trust reverse proxy (needed for Render, Vercel, Heroku, Nginx, etc.) to get correct client IPs
app.set('trust proxy', 1);

//routes importing
const errorMiddleware = require('./middlewares/errors');
const courseRoutes = require('./routes/course.routes');
const mentorRoutes = require('./routes/mentor.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const contactRoutes = require("./routes/contact.routes");
const progressRoutes = require('./routes/progress.routes');
const chatbotRoutes = require('./routes/chatbot.routes');

//auth Routes
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');

// Middlewares
dotenv.config();
// Use Helmet with cross-origin friendly resource policy
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ==========================================
// UNTHROTTLED HEALTH & UPTIME CHECKS
// Placed BEFORE rate limiter so keep-alive and monitors never hit 429
// ==========================================
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'E-Learning Platform API is active', ...getHealthStatus() });
});
app.get('/health', (req, res) => res.status(200).json(getHealthStatus()));
app.get('/api/health', (req, res) => res.status(200).json(getHealthStatus()));

// Rate Limiting to prevent brute-force / DDoS attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to sensitive endpoints
app.use('/api/auth/login', apiLimiter);
app.use('/api/auth/register', apiLimiter);
app.use('/api/chatbot/ask', apiLimiter);

app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chatbot', chatbotRoutes);

// globelly Error handle middleware
app.use(errorMiddleware);

module.exports = app;
