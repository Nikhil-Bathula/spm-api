import express, { Express, Request, Response } from "express";
import * as bodyParser from "body-parser";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.get("/", (request: Request, res: Response) => {
            res.send("TypeScript says Hi...!");
        });

        this.express.use("*", (req: Request, res: Response, next) => {
           res.status(404).json("Not Found.");
        });
    }
}

export default new App().express;