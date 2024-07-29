import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"
import { Web3 } from "web3";

const web3 = new Web3('https://eth.llamarpc.com');

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockData () {
      setBlock(await web3.eth.getBlock());
    };

    if (!block) {
      getBlockData();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          block ?
          <l>
            <li>Number - {block.number.toString()}.</li>
            <li>Timestamp - {block.timestamp.toString()}</li>
            <li>Size - {block.size.toString()}</li>
            <li>Gas Limit - {block.gasLimit.toString()}</li>
            <li>Hash - {block.hash}</li>
            <li>Nonce - {block.nonce.toString()}</li>
          </l>
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
