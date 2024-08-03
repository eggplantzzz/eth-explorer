import "./App.css";
import BlockDetails from "./BlockDetails";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [latestBlock, setLatestBlock] = useState();
  const [allKnownBlocks, setAllKnownBlocks] = useState({});
  const [timerSet, setTimerSet] = useState(false);

  async function getAndSetLatestBlock () {
    const response = await axios({
      method: "get",
      url: "http://localhost:3001/latestblock"
    });
    const block = response.data;
    setLatestBlock(block);
  };

  async function getAndSetAllKnownBlocks () {
    const response = await axios({
      method: "get",
      url: "http://localhost:3001/blocks"
    });
    const allBlocks = response.data;
    setAllKnownBlocks(allBlocks);
  }

  async function deleteAllBlocks () {
    const response = await axios({
      method: "delete",
      url: "http://localhost:3001/blocks"
    });
    setAllKnownBlocks({});
  }

  function getAllKnownBlocks (blocks) {
    let components = [];
    for (const blockNumber in blocks) {
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

  useEffect(() => {
    // we ensure only one timer instance gets created
    if (!timerSet) {
      setInterval(() => {
        getAndSetLatestBlock();
        // update the list only if the client has already fetched all the data
        if (Object.keys(allKnownBlocks).length > 0) {
          getAndSetAllKnownBlocks();
        }
      }, 15000);
      setTimerSet(true);
    }
  }, []);

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
