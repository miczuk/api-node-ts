import * as express from "express";
import * as bodyParser from "body-parser";

import { saveTag } from "./models/Tag";
import { tagsRouter } from "./routers/tags";

declare namespace Express {
  export interface Request {
    tenant?: string;
  }
}

export const serverFactory = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.use("/tags", tagsRouter);

  //POST
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/name", function (req, res) {
    const {
      body: { first, last },
    } = req;
    const name = `${first} ${last}`;
    res.json({ name });
  });

  return app;
};
