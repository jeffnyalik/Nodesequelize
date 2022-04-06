const express = require('express');
const router = express.Router();
const rolesVerify = require('../../middleware/verifyRoles');
const roles = require('../../controllers/roles/rolesController');

// module.exports = function(app){
//     app.use(function(req, res, next){
//         next()
//     });

//     app.post('/', [rolesVerify.checkRolesExists], roles.createRoles)
// }

router.post('/', [rolesVerify.checkRolesExists], roles.createRoles);



module.exports = router;