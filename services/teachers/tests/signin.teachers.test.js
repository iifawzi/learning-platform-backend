const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;


describe("/teachers", ()=>{
    /*
    Test the signin teacher api: 
    */
    describe("/signin", async ()=>{

        it("Should respond with 400 if there's an error on schema",async ()=>{
            let res = await request(server)
                .post("/api/teachers/signin")
                .send({
                    "teacher_phone_number": "01090243795",
                })
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 401 if not authenticated (account not found)",async ()=>{
            let res = await request(server)
                .post("/api/teachers/signin")
                .send({
                    "teacher_phone_number": "01090246712",
                    "password": "12345rewqwa"
                })
                expect(res.statusCode).equal(401,res.body.message);
        });
        
        it("Should respond with 200 if signin successfully",async ()=>{
            // we will not make the account here, account is already made.
            let res = await request(server)
                .post("/api/teachers/signin")
                .send({
                    "teacher_phone_number": "01090243795",
                    "password": "12qwaszx"
                });
            expect(res.statusCode).equal(200,res.body.message);
            expect(res.body.data).have.property("teacher_name").equal("Fawzi E. Abdulfattah");
            expect(res.body.data).have.property("teacher_phone_number").equal("01090243795");
            expect(res.body.data).have.property("token");
            expect(res.body.data).have.property("teacher_refresh_token");
            expect(res.body.data).not.have.property("password");
        });
    });
});
