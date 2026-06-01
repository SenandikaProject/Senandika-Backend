const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/journals");
    },

    filename: (req, file, cb) => {

        const fileName =
            "journal-" +
            Date.now() +
            path.extname(file.originalname);

        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {

        const allowed = [

            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowed.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(
                new Error(
                    "Format file tidak didukung"
                )
            );
        }
    }

const upload = multer({

    storage,

    limits: {

        fileSize: 3 * 1024 * 1024
    },
    fileFilter
});


module.exports = upload;