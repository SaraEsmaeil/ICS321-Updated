const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sa@123123',
  database: 'Soccer@KFUPM'
});

(async () => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('✅ Database connected:', rows[0].now);
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
})();

module.exports = pool;