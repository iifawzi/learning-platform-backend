const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const should = require('chai').should()
const {db} = require("../../startup/db");
const { deleteStudent } = require("./students.service");
chai.use(chaiHttp);
describe("Students Apis", ()=>{
    /*
    Test the Create student api: 
    */
    describe("/signup", ()=>{
        it("Should respond with 400 if there's an error on schema",(done)=>{
            chai.request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                })
                .end((err,response)=>{
                    response.should.have.status(400);
                    done();
                });
        });
        it("Should respond with 201 if add successfully",(done)=>{
            chai.request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                })
                .end((err,response)=>{
                    response.should.have.status(201);
                    response.body.data.should.have.property("student_name").eq("Fawzi");
                    response.body.data.should.have.property("phone_number").eq("01090243795");
                    response.body.data.should.not.have.property("password");
                    response.body.data.should.have.property("token");
                    response.body.data.should.have.property("refresh_token");
                    done();
                });
        });
        it("Should respond with 409 if already registered",(done)=>{
            chai.request(server)
                .post("/api/students/signup")
                .send({
                    "student_name":"Fawzi",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                })
                .end(async (err,response)=>{
                    response.should.have.status(409);
                    await deleteStudent("01090243795");
                    done();
                });
        });
    });
});
