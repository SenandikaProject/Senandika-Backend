const jwt = require('jsonwebtoken');

const generateToken = (id) => {

    return jwt.sign(

        // PAYLOAD
        {
            id: id
        },

        // SECRET
        process.env.JWT_SECRET,

        // OPTIOJNS
        {
            expiresIn: '7d'
        }
    );
};

module.exports = generateToken;