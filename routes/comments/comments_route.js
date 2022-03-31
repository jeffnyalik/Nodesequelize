const express = require('express');
const router = express.Router();

const comments = require('../../controllers/comments/commentController');


router.post('/', comments.createComment);
router.get('/', comments.getAllComments);
router.get('/:id', comments.singleComment);

module.exports = router;