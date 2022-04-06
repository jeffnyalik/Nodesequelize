const db = require('../models/index');
const ROLES = db.ROLES;


const checkRolesExists = ((req, res, next) =>{
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++){
            if(ROLES.includes(req.body.roles[i])){
                res.status(400).send({message: "Role already exist"});
                return;
            }

            res.status(200).send({message: "Role does not exist"});
        }
    }

    next();
});



// const verifyRoles = {
//     checkRolesExists: checkRolesExists
// }


module.exports = {
    checkRolesExists,
};