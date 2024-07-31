import "./App.css";
import { useEffect, useState } from "react"
import axios from "axios";

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getLatestBlockData () {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:3001/latestblock"
        });
        const blockData = response.data;
        setBlock(blockData);
        console.log("the response from the server is -- %o", response);
      } catch (error) {
        console.log("there was an error while posting data -- %o", error);
      }
    };

    if (!block) {
      getLatestBlockData();
    }
  }, [block]);

  return (
    <div className="App">
      <header className="latest-block">
        {
          block ?
          <div className="latest-block-details">
            <div>Number - {block.number.toString()}.</div>
            <div>Timestamp - {block.timestamp.toString()}</div>
            <div>Size - {block.size.toString()}</div>
            <div>Gas Limit - {block.gasLimit.toString()}</div>
            <div>Hash - {block.hash}</div>
            <div>Nonce - {block.nonce.toString()}</div>
          </div>
          :
          null
        }
      </header>
      <div className="block-list">
      </div>
    </div>
  );
}

export default App;
