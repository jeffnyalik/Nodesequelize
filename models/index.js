const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.comments = require('../models/customer_model.js')(sequelize, Sequelize);
db.tutorials = require('../models/tutorial_model.js')(sequelize, Sequelize);
db.images = require('../models/image_model')(sequelize, Sequelize);
db.tags = require('../models/tag_model')(sequelize, Sequelize);
db.tags.belongsToMany(db.tutorials, {
    through: "tutorial_tag",
    as: "tutorials",
    foreignKey: "tag_id"
});
db.tutorials.belongsToMany(db.tags, {
    through: "tutorial_tag",
    as: "tags",
    foreignKey: "tutorial_id"
})
db.tutorials.hasMany(db.comments, {as: 'comments'});
db.comments.belongsTo(db.tutorials, {
    foreignKey: 'tutorialId',
    as: 'tutorial'
})
module.exports = db;