const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;
const { createToken } = require("../../../helpers/jwt");
const { deleteGroup } = require("../groups.service");
const tokens = require("../../../helpers/tokens");

describe("/groups", ()=>{
    /*
    Test the Create group api: 
    */
    describe("/create", async ()=>{

        it("Should respond with 400 if there's an error on schema",async()=>{
            const token = createToken(tokens.teacher_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/groups/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "group_name":"Math 001",
                    "group_description": "The best group in the world, which is awesome really!"
                    // missing join_using
                });
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 201 if created successfully",async()=>{
            const token = createToken(tokens.teacher_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/groups/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "group_name":"Math 001",
                    "group_description": "The best group in the world, which is awesome really!",
                    "join_using": "code"
                });
                expect(res.statusCode).to.equal(201,res.body.message);
                expect(res.body.data).have.property("group_name").eq("Math 001");
                expect(res.body.data).have.property("group_description").eq("The best group in the world, which is awesome really!");
                expect(res.body.data).have.property("group_code");
                expect(res.body.data).have.property("teacher_id");
                expect(res.body.data).have.property("join_using").eq("code");
                await deleteGroup(res.body.data.group_id);
        });
    });
});
