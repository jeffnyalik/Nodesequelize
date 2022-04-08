const express = require('express');
const router = express.Router();
const verifyRegister = require('../../middleware/verifyAuths');
const user = require('../../controllers/auth/auth_contoller');


router.post('/register', [
    verifyRegister.checkDuplicateUsernameOrEmail,
    verifyRegister.checkRolesExisted
], user.createUser);


module.exports = router;