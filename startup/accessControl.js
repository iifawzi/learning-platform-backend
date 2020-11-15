const AccessControl = require("accesscontrol");
const ac = new AccessControl();

// student perms: 
ac.grant('student')    
    // users apis:              
    .updateOwn('token');

// principle perms: 
ac.grant('principle')
    // teachers apis: 
    .create("teachers")
    // classes apis: 
    .create("classes")
    .readOwn("classes")
    // tokens: 
    .updateOwn("token")
    


module.exports = ac;