const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');
const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, ${Date.now()}-${file.originalname});
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
        }
    }
});

// POST Create Employee
router.post('/', upload.single('image'), async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image: req.file.path
        });

        await newEmployee.save();
        res.json({ msg: 'Employee created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
