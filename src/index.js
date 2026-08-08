const express = require('express');
const upload = require('./middleware/multer');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const layananRoutes = require('./routes/layanan');
const portofolioRoutes = require('./routes/portofolio');
const testimoniRoutes = require('./routes/testimoni');
const kontakRoutes = require('./routes/kontak');
const middlewareLogRequest = require('./middleware/logs');
const db = require('./config/database');
const app = express();

//middleware untuk log request ke server
app.use(middlewareLogRequest);

//middleware untuk public folder
app.use('/assets', express.static('public/images'));

//izinkan tampilan dalam bentuk json
app.use(express.json());

 
//routing untuk domain /home
app.use('/home', homeRoutes);

//routing untuk domain /about
app.use('/about', aboutRoutes);

//routing untuk domain /layanan
app.use('/layanan', layananRoutes);

//routing untuk domain /portofolio
app.use('/portofolio', portofolioRoutes);

//routing untuk domain /testimoni
app.use('/testimoni', testimoniRoutes);

//routing untuk domain /kontak
app.use('/kontak', kontakRoutes);

//routing untuk upload file
app.post('/upload', upload.single('pictures'), (req, res) => {
    res.status(201).json({
        message: 'File has been uploaded'
    });
});

// //routing untuk domain /
// app.use("/", (req, res, next) => {
//     res.json({
//         message: 'Home page by Zeke'
//     });
// });

// Ensure messages table exists before starting the server
const initDbAndStart = async () => {
    try {
        const createMessagesTable = `
        CREATE TABLE IF NOT EXISTS messages (
            id_message INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            noWA VARCHAR(50) NOT NULL,
            location VARCHAR(255),
            kebutuhan VARCHAR(255) NOT NULL,
            details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await db.execute(createMessagesTable);
        app.listen(4000, () => {
            console.log('Server berhasil running di port 4000');
        });
    } catch (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
};

initDbAndStart();