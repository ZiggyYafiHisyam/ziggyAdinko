const express = require('express');
const upload = require('./middleware/multer');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const layananRoutes = require('./routes/layanan');
const portofolioRoutes = require('./routes/portofolio');
const testimoniRoutes = require('./routes/testimoni');
const kontakRoutes = require('./routes/kontak');
const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use('/assets', express.static('public/images'));
app.use(express.json());

app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/layanan', layananRoutes);
app.use('/portofolio', portofolioRoutes);
app.use('/testimoni', testimoniRoutes);
app.use('/kontak', kontakRoutes);

app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/portofolio', portofolioRoutes);
app.use('/api/testimoni', testimoniRoutes);
app.use('/api/kontak', kontakRoutes);

app.post('/upload', upload.single('pictures'), (req, res) => {
  res.status(201).json({ message: 'File has been uploaded' });
});

module.exports = app;
