import "./App.css";
import BlockDetails from "./BlockDetails";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [latestBlock, setLatestBlock] = useState();
  const [allKnownBlocks, setAllKnownBlocks] = useState({});

  async function getAndSetLatestBlock () {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/latestblock"
      });
      const block = response.data;
      setLatestBlock(block);
      console.log("the response from the server is -- %o", response);
    } catch (error) {
      console.log("there was an error while posting data -- %o", error);
    }
  };

  async function getAndSetAllKnownBlocks () {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/blocks"
      });
      const allBlocks = response.data;
      setAllKnownBlocks(allBlocks);
      console.log("the response from the server is -- %o", response);
    } catch (error) {
      console.log("there was an error while posting data -- %o", error);
    }
  }

  async function deleteAllBlocks () {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:3001/blocks"
      });
      setAllKnownBlocks({});
      console.log("the response from the server is -- %o", response);
    } catch (error) {
      console.log("there was an error while posting data -- %o", error);
    }
  }

  function getAllKnownBlocks (blocks) {
    let components = [];
    console.log("the blocks coming in -- %o", blocks);
    for (const blockNumber in blocks) {
      console.log("the block -- %o", blockNumber);
      components.push(
        <BlockDetails
          key={blocks[blockNumber].number}
          number={blocks[blockNumber].number}
          timestamp={blocks[blockNumber].timestamp}
          size={blocks[blockNumber].size}
          gasLimit={blocks[blockNumber].gasLimit}
          hash={blocks[blockNumber].hash}
          nonce={blocks[blockNumber].nonce}
        />
      )
    }
    return components;
  }

  useEffect(() => {
    if (!latestBlock) getAndSetLatestBlock();
  }, [latestBlock]);

  // periodically update the latest block data
  setInterval(() => getAndSetLatestBlock(), 30000);

  return (
    <div className="App">
      <header className="latest-block">
        <h1>Latest Block Details</h1>
        {
          latestBlock ?
            <BlockDetails
              number={latestBlock.number}
              timestamp={latestBlock.timestamp}
              size={latestBlock.size}
              gasLimit={latestBlock.gasLimit}
              hash={latestBlock.hash}
              nonce={latestBlock.nonce}
            />
            :
            null
        }
        <div className="buttons-container">
          <div className="fetch-all-blocks-button" onClick={() => getAndSetAllKnownBlocks()}>
            Fetch All Blocks From DB
          </div>
          <div className="delete-all-blocks-button" onClick={() => deleteAllBlocks()}>
            Delete All Blocks From DB
          </div>
        </div>
      </header>
      {
        Object.keys(allKnownBlocks).length > 0 ?
        <div className="block-list">
          <h1>All Known Blocks</h1>
          { getAllKnownBlocks(allKnownBlocks) }
        </div>
        :
        null
      }
    </div>
  );
}

export default App;
