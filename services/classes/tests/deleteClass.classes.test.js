const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;
const chaiEach = require("chai-each");
chai.use(chaiEach);

const { createToken } = require("../../../helpers/jwt");
const tokens = require("../../../helpers/tokens");


describe("/classes", ()=>{
    /*
    Test the Create class api: 
    */
    describe("/", async ()=>{

        it("Should respond with 200 if created successfully",async()=>{
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
                let class_id = res.body.data.class_id;
                res = await request(server)
                .delete("/api/classes/")
                .set({authorization: "Bearer " + token})
                .send({
                    "class_id": class_id,
                });
                expect(res.statusCode).to.equal(200,res.body.message);
                expect(res.body.data).to.equal(1);
        });
    });
});
