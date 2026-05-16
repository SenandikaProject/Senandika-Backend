const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const journalRoutes = require('./routes/journalRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {

    if (
        err instanceof multer.MulterError
    ) {

        return res.status(400).json({

            success: false,

            message:
                'Ukuran file terlalu besar'
        });
    }

    res.status(500).json({

        success: false,

        message: err.message
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/profile', profileRoutes);
app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'uploads')
    )
);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});