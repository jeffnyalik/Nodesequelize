const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Tutorial = sequelize.define('tutorial', {
        id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true, 
           allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        published: {
            type: Sequelize.BOOLEAN,
        }
    });

    return Tutorial;
}