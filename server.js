const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Hello World!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
