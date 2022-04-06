const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Tag = sequelize.define('tag', {
        name: {
            type: Sequelize.STRING
        }
    });

    return Tag;
}