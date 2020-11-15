const chai = require("chai");
const request = require('supertest');
const server = require("../../../server");
const expect = chai.expect;
const chaiEach = require("chai-each");
chai.use(chaiEach);

const { createToken } = require("../../../helpers/jwt");
const { deleteClass } = require("../classes.service");
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
                .get("/api/classes/")
                .set({authorization: "Bearer " + token})
                expect(res.statusCode).to.equal(200,res.body.message);
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).each.to.have.property("class_id");
                expect(res.body.data).each.to.have.property("class_name");
                expect(res.body.data).each.to.have.property("class_description");
                expect(res.body.data).each.to.have.property("join_using");
                expect(res.body.data).each.to.have.property("class_code");
                await deleteClass(class_id);
        });
    });
});
