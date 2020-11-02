const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;
const { createToken } = require("../../../helpers/jwt");
const tokens = require("../../../helpers/tokens");

describe("/groups", ()=>{
    /*
    Test the Create group api: 
    */
    describe("/create", async ()=>{

        it("Should respond with 400 if there's an error on schema",async()=>{
            const token = createToken(student_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/groups/create")
                .set({autorization: "Bearer " + token})
                .send({
                    "group_name":"Math 001",
                    "teacher_id": 1,
                    "group_description": "The best group in the world, which is awesome really!",
                    "group_code": "0203292309",
                    // missing join_using
                });
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 201 if created successfully",async()=>{
            const token = createToken(student_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/groups/create")
                .set({autorization: "Bearer " + token})
                .send({
                    "group_name":"Math 001",
                    "teacher_id": 1,
                    "group_description": "The best group in the world, which is awesome really!",
                    "group_code": "0203292309AB",
                    "join_using": "code"
                });
                expect(res.statusCode).to.equal(201,res.body.message);
                expect(res.body.data).have.property("group_name").eq("Math 001");
                expect(res.body.data).have.property("teacher_id").eq(1);
                expect(res.body.data).have.property("group_description").eq("The best group in the world, which is awesome really!");
                expect(res.body.data).have.property("group_code").eq("0203292309AB");
                expect(res.body.data).have.property("join_using").eq("code");
        });
    });
});
