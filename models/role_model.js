const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Role = sequelize.define('roles', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: Sequelize.STRING,
            unique: true

        },
    });

    return Role
}