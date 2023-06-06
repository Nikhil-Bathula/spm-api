import * as http from "http";
import App from "./app";

const port = 8080;

// const app = express();

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

server.on("listening", () => {
    console.log(`App listening on port : ${port}`);
    console.log(`http://localhost:${port}`);

});

module.exports = App;

// app.get("/", (req: Request, res: Response ) => {
//     res.send("TypeScript says Hello...!");
// });
//
// app.listen(port, () => {
//     console.log(`App listening on PORT : ${port}`);
//     console.log(`http://localhost:${port}`);
// });