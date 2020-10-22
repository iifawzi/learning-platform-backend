const chai = require("chai");
const request = require('supertest');
const { createToken } = require("../../../helpers/jwt");
const { student_token } = require("../../../helpers/tokens");
const server = require("../../../server");
const { deleteStudent } = require("../students.service");
const expect = chai.expect;


describe("/students", () => {
    /*
    Test the refresh_token api: 
    */
    describe("/refresh_token", async () => {

        it("Should respond with 400 if there's an error on schema", async () => {
            const token = createToken(student_token(1, "Fawzi E. Abdulfattah", "02098348590"));
            let res = await request(server)
                .post("/api/students/refresh_token")
                .set({ authorization: token })
            expect(res.statusCode).equal(400, res.body.message);
        });

        it("Should respond with 200 if updated and return new refresh token successfully", async () => {
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "student_name": "Fawzi E. Abdulfattah",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                });
            expect(res.statusCode).equal(201, res.body.message);
            const token = res.body.data.token;
            const refresh_token = res.body.data.refresh_token;
            res = await request(server)
                .post("/api/students/refresh_token")
                .set({ authorization: token })
                .send({
                    "refresh_token": refresh_token,
                });
            expect(res.statusCode).equal(200, res.body.message);
            expect(res.body.data).have.property("authorization");
            await deleteStudent("01090243795");
        });

        it("Should respond with 401 if refresh_token dosn't match the one in db", async () => {
            let res = await request(server)
                .post("/api/students/signup")
                .send({
                    "student_name": "Fawzi E. Abdulfattah",
                    "phone_number": "01090243795",
                    "password": "12qwaszx"
                });
            expect(res.statusCode).equal(201, res.body.message);
            const token = res.body.data.token;
            res = await request(server)
                .post("/api/students/refresh_token")
                .set({ authorization: token })
                .send({
                    "refresh_token": "wrongrefreshtokenisherehey",
                });
            expect(res.statusCode).equal(401, res.body.message);
            await deleteStudent("01090243795");
        });

        // since we're checking the account to see if exists or not first, the refresh_token will not matter here.
        it("Should respond with 404 if account is not found", async () => {
            const token = createToken(student_token(1, "Fawzi E. Abdulfattah", "02098348590")); // a token with a number not registered to use in the request
            let res = await request(server)
                .post("/api/students/refresh_token")
                .set({ authorization: token })
                .send({
                    "refresh_token": "anystringherewillnotmatter",
                });
            expect(res.statusCode).equal(404, res.body.message);
        });
    });
});
