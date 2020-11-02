//  this will bed used to generate tokens to test in postman if needed: 


const tokens = require("./helpers/tokens");
const {createToken} = require("./helpers/jwt");


console.log(createToken(tokens.teacher_token(1,"fawzi","01090243795", "principle")));