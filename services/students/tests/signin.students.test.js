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
    describe("/signin", async ()=>{

        it("Should respond with 400 if there's an error on schema",async ()=>{
            let res = await request(server)
                .post("/api/students/signin")
                .send({
                    "phone_number": "01090243795",
                })
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 401 if not authenticated (account not found)",async ()=>{
            let res = await request(server)
                .post("/api/students/signin")
                .send({
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                })
                expect(res.statusCode).equal(401,res.body.message);
        });
        
        it("Should respond with 200 if signin successfully",async ()=>{
            let res = await request(server)
            .post("/api/students/signup")
            .send({
                "student_name": "Fawzi E. Abdulfattah",
                "phone_number": "01090243795",
                "password": "12qwaszx"
            });
            expect(res.statusCode).equal(201,res.body.message);
            res = await request(server)
                .post("/api/students/signin")
                .send({
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                });
            expect(res.statusCode).equal(200,res.body.message);
            expect(res.body.data).have.property("student_name").equal("Fawzi E. Abdulfattah");
            expect(res.body.data).have.property("phone_number").equal("01090243795");
            expect(res.body.data).have.property("token");
            expect(res.body.data).have.property("refresh_token");
            expect(res.body.data).not.have.property("password");
            await deleteStudent("01090243795");
        });
    });
});
