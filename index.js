const express = require("express");
const bodyParser = require("body-parser");
const projects = require("./data/projects").projects;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  const searchValue = (req.query.value || "").toLowerCase();
  let filtred = projects.filter(({ title, description }) => {
    return (
      searchValue === "" ||
      title.toLowerCase().includes(searchValue) ||
      description.toLowerCase().includes(searchValue)
    );
  });
  res.json({ filtred });
});

app.post("/auth", (req, res) => {
  req.body.login === "admin" && req.body.password === "1234"
    ? res.send(true)
    : res.send(false);
});

app.listen(5000, () => console.log("Runned on 5000 port"));
