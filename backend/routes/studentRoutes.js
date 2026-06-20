const express = require('express');

const router = express.Router();

const upload = require('../config/multer');

const {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

router.get('/', getStudents);

router.get('/:id', getStudentById);

router.post(
    '/',
    upload.single('photo'),
    addStudent
);

router.put(
    '/:id',
    upload.single('photo'),
    updateStudent
);

router.delete('/:id', deleteStudent);

module.exports = router;
