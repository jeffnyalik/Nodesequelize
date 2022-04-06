const express = require('express');
const router = express.Router()
const images = require('../../controllers/images/imageController');
upload = require('../../middleware/upload');


router.post('/uploads', upload.single('file'), images.uploadFiles);

module.exports = router