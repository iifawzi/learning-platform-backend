const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

module.exports = db.define("teachers", {
    teacher_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacher_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teacher_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    teacher_refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    teacher_role: {
        type: Sequelize.ENUM("principle","teacher"),
        allowNull: false,
    },
}, {
    indexes: [
        {
            fields: ["teacher_phone_number"],
            unique: true,
        },
    ]
});