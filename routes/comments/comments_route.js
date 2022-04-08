const express = require('express');
const router = express.Router();
const authJwt = require('../../middleware/authjwt');
const comments = require('../../controllers/comments/commentController');


router.post('/', comments.createComment);
router.get('/', [authJwt.verifyToken, authJwt.isModerator], comments.getAllComments);
router.get('/:id', comments.singleComment);

module.exports = router;