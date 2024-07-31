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
        console.log("the body -- %o", blockData);
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
      <header className="App-header">
        {
          block ?
          <ul>
            <li>Number - {block.number.toString()}.</li>
            <li>Timestamp - {block.timestamp.toString()}</li>
            <li>Size - {block.size.toString()}</li>
            <li>Gas Limit - {block.gasLimit.toString()}</li>
            <li>Hash - {block.hash}</li>
            <li>Nonce - {block.nonce.toString()}</li>
          </ul>
          :
          null
        }
      </header>
    </div>
  );
}

export default App;
