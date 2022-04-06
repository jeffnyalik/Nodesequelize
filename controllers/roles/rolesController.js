const db = require('../../models/index');
const Role = db.roles;


const createRoles =  ((req, res) =>{
    if(!req.body.name){
        res.status(400).send({message: 'Name can not be empty'});
        return;
    }

    const roles = {
        name: req.body.name
    }

    Role.create(roles).then((roles) =>{
        console.log(roles);
        res.status(201).send({message: "Role created successfully"})
    }).catch(err => {
        const errObj = {};
        err.errors.map( er => {
        errObj[er.path] = er.message;
        })
        console.log(errObj);

        res.status(400).send(errObj)
    })
});



module.exports = {
    createRoles,
};