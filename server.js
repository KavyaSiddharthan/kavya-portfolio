require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// Initialize SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'messages.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT NOT NULL,
      email TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});


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

// POST endpoint for contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  db.run(`INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`, [name, email, message], async function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to save contact message.' });
    }
    console.log(`Contact message saved to database with ID: ${this.lastID}`);

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
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\n--- Database ID: ${this.lastID} ---`
      };

      await transporter.sendMail(mailOptions);
      console.log('Contact email sent successfully');
    } catch (error) {
      console.error('Error sending contact email:', error);
    }

    res.json({ message: 'Contact message sent successfully!' });
  });
});

app.post('/api/notes', async (req, res) => {
  const { sender, note } = req.body;
  if (!sender || !note) {
    return res.status(400).json({ error: 'Please provide sender and note.' });
  }
  // Parse sender to extract name and email
  const senderMatch = sender.match(/^(.+?)\s*\(([^)]+)\)$/);
  const name = senderMatch ? senderMatch[1].trim() : sender;
  const email = senderMatch ? senderMatch[2].trim() : 'unknown@example.com';

  db.run(`INSERT INTO notes (sender, email, note) VALUES (?, ?, ?)`, [name, email, note], async function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to save note to database.' });
    }
    console.log(`Note saved to database with ID: ${this.lastID}`);

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
        text: `Sender: ${name}\nEmail: ${email}\nNote:\n${note}\n\n--- Database ID: ${this.lastID} ---`
      };

      await transporter.sendMail(mailOptions);
      console.log('Note email sent successfully');
    } catch (error) {
      console.error('Error sending note email:', error);
    }

    res.json({ message: 'Note sent successfully!' });
  });
});

// GET endpoint for current like count
app.get('/api/likes', (req, res) => {
  db.get(`SELECT COUNT(*) as count FROM likes`, (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to get like count.' });
    }
    res.json({ likes: row.count });
  });
});

// POST endpoint for like increment
app.post('/api/like', async (req, res) => {
  db.run(`INSERT INTO likes DEFAULT VALUES`, async function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to save like.' });
    }
    console.log(`Like saved to database with ID: ${this.lastID}`);

    // Get current count
    db.get(`SELECT COUNT(*) as count FROM likes`, async (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Failed to get like count.' });
      }

      const likeCount = row.count;

      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER || 'kavyasiddharthan07@gmail.com',
            pass: process.env.EMAIL_PASS || 'awjd arkv edxo rhqm'
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'kavyasiddharthan07@gmail.com',
          subject: 'New Like on Your Portfolio!',
          text: `Someone liked your portfolio! Total likes: ${likeCount}\n\n--- Database ID: ${this.lastID} ---`
        };

        await transporter.sendMail(mailOptions);
        console.log('Like notification email sent successfully');
      } catch (emailError) {
        console.error('Error sending like notification email:', emailError);
      }

      res.json({ likes: likeCount });
    });
  });
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
