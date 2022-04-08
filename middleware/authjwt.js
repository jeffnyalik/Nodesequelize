const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.users;
const config = require('../config/auth_config');


const verifyToken = (req, res, next) =>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(400).send({message: 'No token provided'});
    }

    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: 'Unathorized'
            });
        }
        
        req.userId = decoded.id
        next();
    });
};


const isAdmin = (req, res, next) =>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({message: 'Required ADMIN ROLE'});
            return
        });
    });
};


const isModerator = (req, res, next) =>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === 'moderator'){
                    next()
                    return;
                }
            }
            res.status(403).send({message: 'Required Moderator ROLE'});
            return
        })
    })
}

const isModeratorOrAdmin = (req, res, next) =>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === 'moderator'){
                    next()
                    return;
                }

                if(roles[i].name === 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({message: 'Required Moderator or Admin ROLE'});
            return
        })
    })
}

//Addtional roles can be added here i.e isStudent, isSupervisor... etc



module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
}