const express = require('express');
const path = require('path');
const bootstrap = require('./config/bootstrap');
const upload = require('./middleware/multer');
const sessionMiddleware = require('./middleware/session');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const layananRoutes = require('./routes/layanan');
const portofolioRoutes = require('./routes/portofolio');
const testimoniRoutes = require('./routes/testimoni');
const kontakRoutes = require('./routes/kontak');
const middlewareLogRequest = require('./middleware/logs');

const app = express();

// Kick off schema creation + seeding immediately; the guard below awaits it.
bootstrap().catch(() => { /* logged inside bootstrap; retried per-request */ });

app.use(middlewareLogRequest);
app.use('/assets', express.static(path.resolve(__dirname, '../public/images')));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Make sure the database is ready before any API request touches it.
app.use('/api', async (req, res, next) => {
  try {
    await bootstrap();
    next();
  } catch (err) {
    res.status(503).json({ message: 'Database not ready', serverMessage: err.message });
  }
});

// API Routes — the only backend surface. All clients call these under /api/*.
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/portofolio', portofolioRoutes);
app.use('/api/testimoni', testimoniRoutes);
app.use('/api/kontak', kontakRoutes);

const handleUpload = (req, res) => {
  if (req.files && req.files.length > 0) {
    const fileUrls = req.files.map(f => `/assets/${f.filename}`);
    return res.status(201).json({ 
      message: 'File berhasil diunggah', 
      url: fileUrls.join(','), 
      filename: req.files.map(f => f.filename).join(',') 
    });
  } else if (req.file) {
    const fileUrl = `/assets/${req.file.filename}`;
    return res.status(201).json({ 
      message: 'File berhasil diunggah', 
      url: fileUrl, 
      filename: req.file.filename 
    });
  }
  return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
};

app.post('/api/upload', upload.array('pictures', 10), handleUpload);

// Serve Frontend SPA
const fs = require('fs');
const frontendDist = path.resolve(__dirname, '../frontend/dist');
const indexPath = path.join(frontendDist, 'index.html');

app.use(express.static(frontendDist));

app.get(/^\/(?!api\/|assets\/).*/, (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile('index.html', { root: frontendDist }, (err) => {
      if (err && !res.headersSent) {
        res.status(500).send('Error serving frontend application: ' + err.message);
      }
    });
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <title>Adinko - Frontend belum di-build</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F8F9FA; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .card { background: #FFFFFF; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 500px; text-align: center; }
            h2 { color: #121212; margin-top: 0; }
            p { color: #667085; line-height: 1.6; }
            code { background: #F2F4F7; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Frontend belum di-build</h2>
            <p>Folder <code>frontend/dist</code> belum ada. Jalankan perintah berikut dari root project, lalu muat ulang halaman ini:</p>
            <p><code>npm run build &amp;&amp; node src/index.js</code></p>
          </div>
        </body>
      </html>
    `);
  }
});

// Global error handler — catches body-parser SyntaxErrors (Express 5) and returns JSON
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Invalid JSON body', serverMessage: err.message });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', serverMessage: err.message });
});

module.exports = app;

