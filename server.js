const express = require("express");
const app = express();
const cors = require("cors");
const JSONdb = require("simple-json-db");
const { Web3 } = require("web3");
const db = new JSONdb("./db.json");

const port = 3001;
const web3 = new Web3("https://eth.llamarpc.com");

// this package is used to enable CORS "stuff"
// setting the headers manually didn't seem to be enough
app.use(cors());
// required for parsing POST request body
app.use(express.json())

app.get("/latestblock", async (req, res) => {
  const blockData = await web3.eth.getBlock();
  const { gasLimit, number, hash, size, timestamp, nonce } = blockData;
  const formattedBlockData = {
    gasLimit: gasLimit.toString(),
    number: number.toString(),
    hash: hash.toString(),
    size: size.toString(),
    timestamp: timestamp.toString(),
    nonce: nonce.toString()
  }
  if (!db.has(number.toString())) {
    console.log("adding new block data");
    db.set(number.toString(), formattedBlockData);
  }
  res.json(formattedBlockData);
});

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
