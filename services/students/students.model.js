const {db} = require("../../startup/db");
const Sequelize = require("sequelize");
const config = require("config");
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
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    account_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: config.get("depends.student_account_status_by_default"),
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
}, {
    indexes: [
        {
            fields: ["phone_number"],
            unique: true,
        },
    ]
});