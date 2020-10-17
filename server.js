const app = require("./app");
const http = require("http");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`Server is listening on Port ${port}`);
});
module.exports = server;