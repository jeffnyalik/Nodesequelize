const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Comment = sequelize.define('comment', {
      name: {
          type: Sequelize.STRING
      },

      text: {
          type: Sequelize.TEXT
      }
    });

    return Comment;
}