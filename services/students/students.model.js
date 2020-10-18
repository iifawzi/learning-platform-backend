const {db} = require("../../startup/db");
const Sequelize = require("sequelize");

module.exports = db.define("students", {
    student_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    student_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    account_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // TODO:: THIS IS DEPEND ON THE TEACHER NEEDS. (USE CONFIG)
        allowNull: false,
    },
    subscription_end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});