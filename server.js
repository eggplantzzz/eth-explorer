const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

// this package is used to enable CORS "stuff"
// setting the headers manually didn't seem to be enough
app.use(cors());

app.post("/block", (req, res) => {
  res.send("Hello World from the post route!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
