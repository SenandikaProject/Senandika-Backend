const multer = require('multer');

const path = require('path');

const fs = require('fs');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            'uploads/profile'
        );
    },

    filename: (req, file, cb) => {

        const uniqueName =
                'profile-'
                + Date.now()
                + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    if (
        allowedTypes.includes(file.mimetype)
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                'Format file tidak didukung'
            ),
            false
        );
    }
};

const upload = multer({

    storage,

    limits: {

        fileSize: 2 * 1024 * 1024
    },

    fileFilter
});

module.exports = upload;