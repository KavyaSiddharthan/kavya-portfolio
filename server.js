require('dotenv').config();
const express = require('express');
const app = express();

// Add Socket.IO
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const path = require('path');

const PORT = process.env.PORT || 3003;

// Initialize PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Supabase
    checkServerIdentity: () => undefined,
  },
});

// Create tables if they don't exist
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        sender TEXT NOT NULL,
        email TEXT NOT NULL,
        note TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('PostgreSQL tables created or already exist.');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

createTables();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (JS, CSS, images, etc.)
app.use(express.static(path.resolve(__dirname)));

const indexPath = path.resolve(__dirname, 'index.html');


// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send current like count on connection
  pool.query('SELECT COUNT(*) as count FROM likes', (err, result) => {
    if (!err && result.rows.length > 0) {
      const count = result.rows[0].count;
      console.log('Sending initial likeCount to socket', socket.id, ':', count);
      socket.emit('likeCount', count);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// POST endpoint for contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const userIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const result = await pool.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id', [name, email, message]);
    const dbId = result.rows[0].id;
    console.log(`Contact message saved to database with ID: ${dbId}`);

    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: email,
        to: 'kavyasiddharthan07@gmail.com',
        subject: `New Contact Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nIP: ${userIP}\nMessage:\n${message}\n\n--- Database ID: ${dbId} ---`
      };

      await transporter.sendMail(mailOptions);
      console.log('Contact email sent successfully');
      emailSent = true;
    } catch (error) {
      console.error('Error sending contact email:', error.message);
      if (error.response) {
        console.error('SMTP response:', error.response);
      }
      if (error.responseCode) {
        console.error('SMTP response code:', error.responseCode);
      }
    }

    if (emailSent) {
      res.json({ message: 'Contact message sent successfully!' });
    } else {
      res.status(500).json({ error: 'Message saved but email notification failed.' });
    }
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ error: 'Failed to save contact message.' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { sender, note } = req.body;
  const userIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  if (!sender || !note) {
    return res.status(400).json({ error: 'Please provide sender and note.' });
  }
  // Parse sender to extract name and email
  const senderMatch = sender.match(/^(.+?)\s*\(([^)]+)\)$/);
  const name = senderMatch ? senderMatch[1].trim() : sender;
  const email = senderMatch ? senderMatch[2].trim() : 'unknown@example.com';

  try {
    const result = await pool.query('INSERT INTO notes (sender, email, note) VALUES ($1, $2, $3) RETURNING id', [name, email, note]);
    const dbId = result.rows[0].id;
    console.log(`Note saved to database with ID: ${dbId}`);

    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: email,
        to: 'kavyasiddharthan07@gmail.com',
        subject: `New Note from ${name}`,
        text: `Sender: ${name}\nEmail: ${email}\nIP: ${userIP}\nNote:\n${note}\n\n--- Database ID: ${dbId} ---`
      };

      await transporter.sendMail(mailOptions);
      console.log('Note email sent successfully');
      emailSent = true;
    } catch (error) {
      console.error('Error sending note email:', error.message);
      if (error.response) {
        console.error('SMTP response:', error.response);
      }
      if (error.responseCode) {
        console.error('SMTP response code:', error.responseCode);
      }
    }

    if (emailSent) {
      res.json({ message: 'Note sent successfully!' });
    } else {
      res.status(500).json({ error: 'Note saved but email notification failed.' });
    }
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ error: 'Failed to save note to database.' });
  }
});

// GET endpoint for current like count
app.get('/api/likes', (req, res) => {
  pool.query('SELECT COUNT(*) as count FROM likes', (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to get like count.' });
    }
    res.json({ likes: result.rows[0].count });
  });
});

// POST endpoint for like increment
app.post('/api/like', async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO likes DEFAULT VALUES RETURNING id');
    const dbId = result.rows[0].id;
    console.log(`Like saved to database with ID: ${dbId}`);

    // Get current count
    const countResult = await pool.query('SELECT COUNT(*) as count FROM likes');
    const likeCount = countResult.rows[0].count;

    // Emit updated like count to all connected clients
    io.emit('likeCount', likeCount);

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kavyasiddharthan07@gmail.com',
        subject: 'New Like on Your Portfolio!',
        text: `Someone liked your portfolio! Total likes: ${likeCount}\n\n--- Database ID: ${dbId} ---`
      };

      await transporter.sendMail(mailOptions);
      console.log('Like notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending like notification email:', emailError);
      if (emailError.response) {
        console.error('SMTP response:', emailError.response);
      }
      if (emailError.responseCode) {
        console.error('SMTP response code:', emailError.responseCode);
      }
    }

    res.json({ likes: likeCount });
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ error: 'Failed to save like.' });
  }
});

  
// Catch-all route to serve index.html for SPA routing
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    next();
  } else {
    res.sendFile(indexPath);
  }
});

// Serve static files from current directory (after routes)
app.use(express.static(__dirname));

// Validate environment variables for email credentials
function validateEnv() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Warning: EMAIL_USER or EMAIL_PASS environment variables are not set. Email sending will fail.');
  }
}

validateEnv();

// Start server with Socket.IO
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
