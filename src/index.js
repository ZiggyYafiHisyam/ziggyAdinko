const express = require('express');

const usersRoutes = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);

app.use('/users', usersRoutes);

app.use("/", (req, res, next) => {
    res.json({
        message: 'ini index method use oleh Ziggy'
    });
});

app.listen(4000, () => {
    console.log('Server berhasil running di port 4000');
})