import "./App.css";
import { useEffect, useState } from "react"
import { Web3 } from "web3";
import axios from "axios";

const web3 = new Web3("https://eth.llamarpc.com");

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockData () {
      try {
        const response = await axios.get("http://localhost:3001");
        console.log("the response from the server is -- %o", response);
        setBlock(await web3.eth.getBlock());
      } catch (error) {
        console.log("there was an error while fetching data -- %o", error);
      }
    };

    if (!block) {
      getBlockData();
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
