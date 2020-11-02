const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

module.exports = db.define("groups", {
    group_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "teachers",
            key: "teacher_id"
        }
    },
    group_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    group_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    group_code: {
        type: Sequelize.CHAR(9),
        allowNull: false,
        unique: true
    },
    join_using: {
        type: Sequelize.ENUM("code", "request"),
        allowNull: false,
    },
});