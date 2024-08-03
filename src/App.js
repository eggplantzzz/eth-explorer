import "./App.css";
import BlockDetails from "./BlockDetails";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [latestBlock, setLatestBlock] = useState();
  const [allBlocks, setAllBlocks] = useState({});
  const [showAllBlocks, setShowAllBlocks] = useState(false);
  const [timerCreated, setTimerCreated] = useState(false);

  async function getAndSetLatestBlock () {
    const response = await axios({
      method: "get",
      url: "http://localhost:3001/latestblock"
    });
    const block = response.data;
    setLatestBlock(block);
  };

  async function getAndSetAllBlocks () {
    const response = await axios({
      method: "get",
      url: "http://localhost:3001/blocks"
    });
    const allBlocks = response.data;
    setAllBlocks(allBlocks);
  }

  async function deleteAllBlocks () {
    const response = await axios({
      method: "delete",
      url: "http://localhost:3001/blocks"
    });
    setAllBlocks({});
  }

  async function toggleShowAllBlocks () {
    if (showAllBlocks) {
      setShowAllBlocks(false);
    } else {
      await getAndSetAllBlocks();
      setShowAllBlocks(true);
    }
  }

  function getAllBlocks (blocks) {
    const reverseSortedBlockNumbers = Object.keys(blocks).toSorted((a, b) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0
      }
    });
    return (
      reverseSortedBlockNumbers.map(number => {
        return <BlockDetails
          key={blocks[number].number}
          number={blocks[number].number}
          timestamp={blocks[number].timestamp}
          size={blocks[number].size}
          gasLimit={blocks[number].gasLimit}
          hash={blocks[number].hash}
          nonce={blocks[number].nonce}
        />
      })
    );
  }

  useEffect(() => {
    if (!latestBlock) getAndSetLatestBlock();
  }, [latestBlock]);

  useEffect(() => {
    // we ensure only one timer instance gets created
    if (!timerCreated) {
      setInterval(() => {
        getAndSetLatestBlock();
        getAndSetAllBlocks();
      }, 15000);
      setTimerCreated(true);
    }
  }, [showAllBlocks]);

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
          <div className="toggle-show-all-blocks-button" onClick={() => toggleShowAllBlocks()}>
            { showAllBlocks ? "Hide" : "Show" } All Blocks From DB
          </div>
          <div className="delete-all-blocks-button" onClick={() => deleteAllBlocks()}>
            Delete All Blocks In DB
          </div>
        </div>
      </header>
      {
        Object.keys(allBlocks).length > 0 ?
        <div className="block-list">
          <h1>All Known Blocks</h1>
          { getAllBlocks(allBlocks) }
        </div>
        :
        null
      }
    </div>
  );
}

export default App;
