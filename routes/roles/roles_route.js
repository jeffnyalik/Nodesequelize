const express = require('express');
const router = express.Router();
const roles = require('../../controllers/roles/rolesController');


router.post('/',  roles.createRoles);



module.exports = router;