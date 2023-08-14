const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${uuidv4()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    const mimetype = file.mimetype.split('/')[1];

    if (mimetype == 'jpg' || mimetype == 'png') {
        cb(null, true);
    } else {
        cb(new Error('Please upload an image file!'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3mb
    }
});

module.exports = upload;
