module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 500]
        }
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      replyCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      handle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });

    Post.associate = (models) => {
      Post.belongsTo(models.User, { 
        foreignKey: {
          allowNull: false,
        },
        targetKey: "email"
      });
    };

    return Post;
};