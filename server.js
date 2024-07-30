const express = require("express");
const app = express();
const cors = require("cors");
const JSONdb = require("simple-json-db");
const db = new JSONdb("./db.json");

const port = 3001;

// this package is used to enable CORS "stuff"
// setting the headers manually didn't seem to be enough
app.use(cors());
// required for parsing POST request body
app.use(express.json())

app.post("/block", (req, res) => {
  if (!db.has(req.body)) {
    console.log("adding new block data");
    db.set(req.body.number, req.body.number);
  }
  res.send("Hello World from the post route!")
});

app.get("/blocks", (req, res) => {
  const allBlocks = db.JSON();
  res.json(allBlocks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
