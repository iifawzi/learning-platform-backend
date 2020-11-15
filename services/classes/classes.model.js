const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

module.exports = db.define("classes", {
    class_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    creator_teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "teachers",
            key: "teacher_id"
        }
    },
    class_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class_code: {
        type: Sequelize.CHAR(9),
        allowNull: false,
        unique: true
    },
    join_using: {
        type: Sequelize.ENUM("code", "request"),
        allowNull: false,
    },
});