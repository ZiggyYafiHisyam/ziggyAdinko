const express = require('express');
const upload = require('./middleware/multer');
const usersRoutes = require('./routes/users');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const layananRoutes = require('./routes/layanan');
const portofolioRoutes = require('./routes/portofolio');
const testimoniRoutes = require('./routes/testimoni');
const kontakRoutes = require('./routes/kontak');
const middlewareLogRequest = require('./middleware/logs');
const app = express();

//middleware untuk log request ke server
app.use(middlewareLogRequest);

//middleware untuk public folder
app.use('/assets', express.static('public/images'));

//izinkan tampilan dalam bentuk json
app.use(express.json());

//routing untuk domain /users
app.use('/users', usersRoutes);

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

app.listen(4000, () => {
    console.log('Server berhasil running di port 4000');
})