import * as express from "express";

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

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

const tagsRouter = express.Router();

// simple logger - used in every method
tagsRouter.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path}-${req.ip}`);
  next();
});

tagsRouter.get("/", middleware, (req, res) => {
  return res.status(200).json({ data: tags, time: req.time });
});

tagsRouter.get("/:tag", (req, res) => {
  const { tag } = req.params;

  return res.status(200).json({
    data: tags.find((element) => element.title.toLowerCase() === tag),
  });
});

export { tagsRouter };
