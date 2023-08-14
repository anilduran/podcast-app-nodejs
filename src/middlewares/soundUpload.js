const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/sounds');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.')[1];
        cb(null, `${uuidv4()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if (ext == 'mpeg') {
        cb(null, true);
    } else {
        cb(new Error('Please upload a sound file!'), false);
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