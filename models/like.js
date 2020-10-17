module.exports = function (sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
      handle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      }
    });

    Like.associate = (models) => {
      Like.belongsTo(models.Post, { 
        foreignKey: {
          allowNull: false,
        },
        targetKey: "id"
      });
    };

    return Like;
};