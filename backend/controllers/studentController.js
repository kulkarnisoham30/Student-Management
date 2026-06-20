const pool = require('../config/db');

// GET ALL STUDENTS
const getStudents = async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM students ORDER BY id'
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Error fetching students'
        });
    }
};

// GET STUDENT BY ID
const getStudentById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM students WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Error fetching student'
        });
    }
};

// ADD STUDENT
const addStudent = async (req, res) => {

    try {

        const {
            name,
            course,
            year,
            dob,
            email,
            mobile,
            gender,
            address
        } = req.body;

        if (
            !name ||
            !course ||
            !year ||
            !dob ||
            !email ||
            !mobile ||
            !gender ||
            !address
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (year < 1 || year > 4) {

            return res.status(400).json({
                message: 'Year must be between 1 and 4'
            });
        }
        
        if (!email.endsWith('@gmail.com')) {
        
            return res.status(400).json({
                message: 'Only Gmail addresses are allowed'
            });
        }
        
        if (!/^\d{10}$/.test(mobile)) {
        
            return res.status(400).json({
                message: 'Mobile number must contain exactly 10 digits'
            });
        }
        
        const photo =
            req.file
                ? req.file.filename
                : null;

        const countResult = await pool.query(
            'SELECT COUNT(*) FROM students'
        );

        const admissionNumber =
            `ADM${1001 + parseInt(countResult.rows[0].count)}`;

        const result = await pool.query(
            `
            INSERT INTO students
            (
                admission_number,
                name,
                course,
                year,
                dob,
                email,
                mobile,
                gender,
                address,
                photo
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
            )
            RETURNING *
            `,
            [
                admissionNumber,
                name,
                course,
                year,
                dob,
                email,
                mobile,
                gender,
                address,
                photo
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        if (error.code === '23505') {
    
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
    
        console.log(error);
    
        res.status(500).json({
            message: 'Error adding student'
        });
    }
};

// Update
const updateStudent = async (req, res) => {

    try {
        const { id } = req.params;

        const {
            name,
            course,
            year,
            dob,
            email,
            mobile,
            gender,
            address
        } = req.body;

        if (
            !name ||
            !course ||
            !year ||
            !dob ||
            !email ||
            !mobile ||
            !gender ||
            !address
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (year < 1 || year > 4) {

            return res.status(400).json({
                message: 'Year must be between 1 and 4'
            });
        }
        
        if (!email.endsWith('@gmail.com')) {
        
            return res.status(400).json({
                message: 'Only Gmail addresses are allowed'
            });
        }
        
        if (!/^\d{10}$/.test(mobile)) {
        
            return res.status(400).json({
                message: 'Mobile number must contain exactly 10 digits'
            });
        }

        if (year < 1 || year > 4) {

            return res.status(400).json({
                message:
                'Year must be between 1 and 4'
            });
        }
        
        const photo =
        req.file
            ? req.file.filename
            : req.body.photo;

        const result = await pool.query(
            `
            UPDATE students
            SET
                name = $1,
                course = $2,
                year = $3,
                dob = $4,
                email = $5,
                mobile = $6,
                gender = $7,
                address = $8,
                photo = $9
            WHERE id = $10
            RETURNING *
            `,
            [
                name,
                course,
                year,
                dob,
                email,
                mobile,
                gender,
                address,
                photo,
                id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Error updating student'
        });
    }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM students WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Error deleting student'
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};
