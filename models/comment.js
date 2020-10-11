module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 240]
            }
        },
    });

    // Comment.associate = function(models) {
    //   Comment.belongsTo(models.Post, { 
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    return Comment;
};