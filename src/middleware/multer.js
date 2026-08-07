const multer = require('multer');
const path = require('path');

// Config simpan file
const storage = multer.diskStorage({
    // Kemana filenya diletakan
    destination (req, file, cb) {
        cb(null, 'public/images');
    },
    // Format nama file 
    filename (req, file, cb) {
        const timestamp = Date.now();
        const originalName = file.originalname;
        cb(null, `${file.fieldname}-${timestamp}${extension}`);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;