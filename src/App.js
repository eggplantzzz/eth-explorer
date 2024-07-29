import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"
import { Web3 } from "web3";

const web3 = new Web3('https://eth.llamarpc.com');

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    async function getBlockData () {
      setBlockNumber(await web3.eth.getBlockNumber());
      setChainId(await web3.eth.getChainId());
    };

    if (!blockNumber || !chainId) {
      getBlockData();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          blockNumber && chainId ?
          <p>
            The block number is {blockNumber.toString()}.
            The chainId is {chainId.toString()}.
          </p>
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
