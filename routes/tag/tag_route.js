const express = require('express');
const router = express.Router();
const tags = require('../../controllers/tags/tagsController');

router.post('/', tags.createTag);

module.exports = router;