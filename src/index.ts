import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

dotenv.config();

declare namespace Express {
  export interface Request {
    tenant?: string
  }
}

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

type Tag = {
  title: string;
  color?: "white" | "yellow" | "green" | "brown";
};

const tags: Tag[] = [
  {
    title: "summer",
  },
  {
    title: "winter",
    color: "white",
  },
];

if (process.env.FIRST_TAG_STYLE === "uppercase") {
  tags[0].title = tags[0].title.toUpperCase();
}

// simple logger - used in every method
app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path}-${req.ip}`)
  next();
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
}

app.get("/tags", middleware, (req, res) => {
  return res.status(200).json({ data: tags, time: req.time });
});

app.get("/tags/:tag", (req, res) => {
  const { tag } = req.params;

  return res
    .status(200)
    .json({ data: tags.find((element) => element.title.toLowerCase() === tag) });
});


//POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/name", function(req, res) {
  const { body: {first, last} } = req;
  const name = `${first} ${last}`
  res.json({ name });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


