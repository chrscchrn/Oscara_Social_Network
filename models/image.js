module.exports = function (sequelize, DataTypes) {
    const Image = sequelize.define("Image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB('medium'),
      }
    });

    Image.associate = (models) => {
        Image.belongsTo(models.User, { 
        foreignKey: {
          allowNull: false,
        },
        targetKey: "email"
      });
    };

    return Image;
};