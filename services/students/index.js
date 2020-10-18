const studentsRoutes = require("./students.route");
const studentsModel = require("./students.route");
const { deleteStudent } = require("./students.service");

module.exports = {
    studentsRoutes, 
    studentsModel,
    deleteStudent,
}