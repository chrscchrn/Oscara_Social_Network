module.exports = function (sequelize, DataTypes) {
    var Reply = sequelize.define("Reply", {
        handle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1, 50]
            }
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1, 140]
            }
        }
    });

    Reply.associate = (models) => {
        Reply.belongsTo(models.Post, { 
            foreignKey: {
            allowNull: false,
            },
            targetKey: "id"
        });
    };

    return Reply;
};