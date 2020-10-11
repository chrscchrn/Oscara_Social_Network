module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 240]
            }
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    // Post.associate = function(models) {
    //   Post.belongsTo(models.User, { 
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    return Post;
};