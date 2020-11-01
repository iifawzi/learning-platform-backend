const studentsRoutes = require("./students.route");
const { deleteStudent } = require("./students.service");

module.exports = {
    studentsRoutes, 
    deleteStudent,
}