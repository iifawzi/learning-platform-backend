const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;
const { createToken } = require("../../../helpers/jwt");
const { deleteClass } = require("../classes.service");
const tokens = require("../../../helpers/tokens");

describe("/classes", ()=>{
    /*
    Test the Create class api: 
    */
    describe("/create", async ()=>{

        it("Should respond with 400 if there's an error on schema",async()=>{
            const token = createToken(tokens.teacher_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/classes/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "class_name":"Math 001",
                    "class_description": "The best class in the world, which is awesome really!"
                    // missing join_using
                });
                expect(res.statusCode).equal(400,res.body.message);
        });

        it("Should respond with 201 if created successfully",async()=>{
            const token = createToken(tokens.teacher_token(1, "Fawzi E. Abdulfattah", "01090243795", "principle"));
            let res = await request(server)
                .post("/api/classes/create")
                .set({authorization: "Bearer " + token})
                .send({
                    "class_name":"Math 001",
                    "class_description": "The best class in the world, which is awesome really!",
                    "join_using": "code"
                });
                expect(res.statusCode).to.equal(201,res.body.message);
                expect(res.body.data).have.property("class_name").eq("Math 001");
                expect(res.body.data).have.property("class_description").eq("The best class in the world, which is awesome really!");
                expect(res.body.data).have.property("class_code");
                expect(res.body.data).have.property("creator_teacher_id");
                expect(res.body.data).have.property("join_using").eq("code");
                await deleteClass(res.body.data.class_id);
        });
    });
});
