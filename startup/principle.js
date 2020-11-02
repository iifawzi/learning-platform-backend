const config = require("config");
// this will be used to create a principle account when server is up.


const {create,getTeacher} = require("../services/teachers");
const crypto = require("crypto");
const { encryptPassword } = require("../helpers/bcrypt");

module.exports = createPrinciple = async () =>{
    try {
        // check if principle account not exists: 
        const principle = await getTeacher("01090243795");
        // create principle if not exists
        if (!principle){
            // generate encrypted password: 
            const encrypted_password = await encryptPassword(config.principle.password);
            // generate refresh token: 
            const refresh_token = crypto.randomBytes(16).toString("hex")
            await create({"teacher_name": config.principle.name, "password": encrypted_password, "teacher_phone_number": config.principle.phone_number,"teacher_role": "principle", "teacher_refresh_token": refresh_token});
        };
    }catch(err){
        console.log(err);
    }
};
