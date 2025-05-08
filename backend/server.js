const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pool = require('./db');
const adminRoutes = require('./routes/admin');
const matchesRouter = require('./routes/matches');
const playersRouter = require('./routes/players'); // Add this line
const tournamentRouter = require('./routes/tournaments'); // Add this line
const captainsRouter = require('./routes/captains'); // path may vary




const app = express();

// Security middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/tournaments',tournamentRouter );
app.use('/api/teams', require('./routes/teams'));
app.use('/api/players', playersRouter); // Add this line
app.use('/api/cards', require('./routes/cards'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/join-requests', require('./routes/join_requests'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api', matchesRouter);
app.use('/api', captainsRouter);
// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok',
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'down',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Email configuration validation
if (!process.env.EMAIL || !process.env.PASSWORD) {
  console.error('❌ Missing email credentials in .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Server startup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});