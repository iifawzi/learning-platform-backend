const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const {deleteTeacher} = require("../teachers.service");
const { createToken } = require("../../../helpers/jwt");
const tokens = require("../../../helpers/tokens");
const expect = chai.expect;

describe("/teachers", ()=>{
    /*
    Test the Create teacher api: 
    */
    describe("/create", async ()=>{

        it("Should respond with 400 if there's an error on schema",async()=>{
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "teacher_name":"Fawzi",
                    "teacher_phone_number": "01090243795",
                });
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 201 if add successfully",async()=>{
            const token = createToken(tokens.teacher_token(1,"ahmed","01090243795","principle"));
            let res = await request(server)
                .post("/api/teachers/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "teacher_name":"Fawzi E. Abdulfattah",
                    "teacher_phone_number": "01090243785",
                    "password": "12qwaszx",
                    "teacher_role": "principle",
                });
                expect(res.statusCode).to.equal(201,res.body.message);
                expect(res.body.data).have.property("teacher_name").eq("Fawzi E. Abdulfattah");
                expect(res.body.data).have.property("teacher_phone_number").eq("01090243785");
                expect(res.body.data).not.have.property("password");
                expect(res.body.data).have.property("token");
                expect(res.body.data).have.property("teacher_refresh_token");
        });

        it("Should respond with 409 if already registered",async()=>{
            const token = createToken(tokens.teacher_token(1,"ahmed","01090243795","principle"));
            let res = await request(server)
                .post("/api/teachers/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "teacher_name":"Fawzi E. Abdulfattah",
                    "teacher_phone_number": "01090243785",
                    "password": "12qwaszx",
                    "teacher_role": "principle",
                });
                expect(res.statusCode).equal(409,res.body.message);
                await deleteTeacher("01090243785");
        });

    });
});
