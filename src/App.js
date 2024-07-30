import "./App.css";
import { useEffect, useState } from "react"
import { Web3 } from "web3";
import axios from "axios";

const web3 = new Web3("https://eth.llamarpc.com");

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getLatestBlockData () {
      try {
        const blockData = await web3.eth.getBlock();
        setBlock(blockData);
        const response = await axios({
          method: "post",
          url: "http://localhost:3001/block",
          data: {
            number: blockData.number.toString()
          }
        });
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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
