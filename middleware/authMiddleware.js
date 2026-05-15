const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        console.log('MIDDLEWARE JALAN');

        const authHeader =
                req.headers.authorization;

        console.log(authHeader);

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: 'Token tidak ditemukan'
            });
        }

        const token =
                authHeader.split(' ')[1];

        console.log(token);

        const decoded =
                jwt.verify(
                        token,
                        process.env.JWT_SECRET
                );

        console.log(decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({

            success: false,

            message: 'Token tidak valid'
        });
    }
};