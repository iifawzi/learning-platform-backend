const teachersRoutes = require("./teachers.route");
const {create,getTeacher} = require("./teachers.service");
module.exports = {
    teachersRoutes, 
    create,
    getTeacher
}