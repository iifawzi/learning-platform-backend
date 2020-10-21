const AccessControl = require("accesscontrol");
const ac = new AccessControl();

// student perms: 
ac.grant('student')    
    // tokens:              
    .updateOwn('token')
    


module.exports = ac;