const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const path = require('path');

require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'uploads')
    )
);

// Student Routes
app.use('/students', studentRoutes);

// Database Test Route
app.get('/', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT NOW()'
        );

        res.json({
            message: 'Database Connected',
            time: result.rows[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Database Error'
        });
    }

});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
