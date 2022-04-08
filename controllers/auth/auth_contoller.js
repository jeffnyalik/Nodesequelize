const db = require('../../models/index');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const User = db.users;
const Role = db.roles;
const OP = Sequelize.Op;
const jwt = require('jsonwebtoken');
const config = require('../../config/auth_config');


const createUser = ((req, res) =>{
    if(!req.body.username){
        res.status(400).send({message: 'username is required'})
    }
    if(!req.body.email){
        res.status(400).send({message: 'email field is required'})
    }
    if(!req.body.password){
        res.status(400).send({message: 'password is required'})
    }
    if(req.body.password.length < 6){
        res.status(400).send({message: 'password should be atleast six characters'})
    }


    const user =  {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 6)
    }

    User.create(user).then(data =>{
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [OP.or]: req.body.roles
                    }
                }
            }).then(roles =>{
                data.setRoles(roles).then(() =>{
                    res.status(200).send({message: 'User registered successfully'})
                })
            })
        }else{
            //set default role as user
            data.setRoles([1]).then(() =>{
                res.status(200).send({message: 'User registered successfully'})
            })
        }
    }).catch(error => {
        res.status(500).send({message: error.message})
    })
});


const signIn = (req, res) =>{
    User.findOne({
        where: {email: req.body.email}
    }).then(user => {
        if(!user){
            return res.status(400).send({message: 'user does not exist'})
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(400).send({accessToken: null, message: 'Invalid password'});
        }

        let token = jwt.sign({id:user.id}, config.secret, {
            expiresIn: 86400 // 24hrs

        });

        let authorities = []
        user.getRoles().then(roles =>{
            for(let i = 0; i < roles.length; i++){
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id:user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(error => {
        res.status(500).send({message: error.message})
    })
}



module.exports = {
    createUser,
    signIn,
}