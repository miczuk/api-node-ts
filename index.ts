import * as express from "express";

const PORT = 3000;

const app = express();

type Tag = {
  title: string;
  color?: "white" | "yellow" | "green" | "brown";
};

let tags: Tag[] = [
  {
    title: "summer",
  },
  {
    title: "winter",
    color: "white",
  },
];

app.get("/tags", (_, res) => {
  return res.status(200).json({ data: tags });
});

app.get("/tags/:tag", (req, res) => {
  const { tag } = req.params;

  return res
    .status(200)
    .json({ data: tags.find((element) => element.title === tag) });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
