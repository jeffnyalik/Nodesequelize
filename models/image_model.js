const Sequelize = require('sequelize');
module.exports = (sequelize) =>{
    const Image = sequelize.define('image', {
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB("long")
        }
    });

    return Image;
}