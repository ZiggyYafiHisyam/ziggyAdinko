const express = require('express');
const path = require('path');
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

// API aliases used by the Vite frontend and the production build.
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/portofolio', portofolioRoutes);
app.use('/api/testimoni', testimoniRoutes);
app.use('/api/kontak', kontakRoutes);

//routing untuk upload file
app.post('/upload', upload.single('pictures'), (req, res) => {
    res.status(201).json({
        message: 'File has been uploaded'
    });
});

// Serve the frontend build when the backend is the only process exposed.
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get(/^\/(?!api(?:\/|$)|home(?:\/|$)|about(?:\/|$)|layanan(?:\/|$)|portofolio(?:\/|$)|testimoni(?:\/|$)|kontak(?:\/|$)|upload(?:\/|$)|assets(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
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
        await db.execute(`
            CREATE TABLE IF NOT EXISTS home (
                id_home INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                subtitle VARCHAR(255),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS kontak (
                id_kontak INT AUTO_INCREMENT PRIMARY KEY,
                kontak_badge VARCHAR(100),
                kontak_title VARCHAR(255) NOT NULL,
                kontak_description TEXT,
                kontak_background_image VARCHAR(255),
                button_primary_text VARCHAR(100),
                button_primary_link VARCHAR(255),
                button_secondary_text VARCHAR(100),
                button_secondary_link VARCHAR(255),
                trust_projects VARCHAR(50),
                trust_expert VARCHAR(50),
                trust_material VARCHAR(50),
                trust_survey VARCHAR(50),
                about_preview_title VARCHAR(255),
                about_preview_description TEXT,
                about_preview_button_text VARCHAR(100),
                about_preview_button_link VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS about (
                id_about INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                content TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS layanan (
                id_layanan INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                category VARCHAR(100),
                description TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS portofolio (
                id_portofolio INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                category VARCHAR(100),
                location VARCHAR(255),
                description TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        app.listen(4000, () => {
            console.log('Server berhasil running di port 4000');
        });
    } catch (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
};

initDbAndStart();