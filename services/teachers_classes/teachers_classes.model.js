const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

module.exports = db.define("teachers_classes", {
    teachers_classes_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "classes",
            key: "class_id"
        },
        onDelete: "CASCADE"
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "teachers",
            key: "teacher_id"
        },
        onDelete: "CASCADE"
    },
}, {
    indexes: [
        {
            fields: ["class_id", "teacher_id"], // this is to be used in classes' service -getClasses-
            unique: true,
        },
    ]
});