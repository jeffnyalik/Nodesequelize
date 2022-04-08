const express = require('express');
const router = express.Router();
const user = require('../../controllers/auth/auth_contoller')

router.post('/login', user.signIn);

module.exports = router;