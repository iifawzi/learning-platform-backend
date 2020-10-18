const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const { deleteStudent } = require("../students.service");

const expect = chai.expect;
chai.should();

describe("/students", ()=>{
    /*
    Test the Create student api: 
    */
    describe("/signup", async ()=>{

        it("Should respond with 400 if there's an error on schema",async()=>{
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                });
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 201 if add successfully",async()=>{
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                });
                expect(res.statusCode).to.equal(201,res.body.message);
                expect(res.body.data).have.property("student_name").eq("Fawzi");
                expect(res.body.data).have.property("phone_number").eq("01090243795");
                expect(res.body.data).not.have.property("password");
                expect(res.body.data).have.property("token");
                expect(res.body.data).have.property("refresh_token");
        });

        it("Should respond with 409 if already registered",async()=>{
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                })
                expect(res.statusCode).equal(409,res.body.message);
                await deleteStudent("01090243795");
        });

    });
});
