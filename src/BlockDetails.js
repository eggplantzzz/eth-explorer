import "./BlockDetails.css";

function BlockDetails (props) {
  const { number, timestamp, size, gasLimit, hash, nonce } = props;
  return(
    <div className="block-details">
      <div>Number - {number}</div>
      <div>Timestamp - {timestamp}</div>
      <div>Size - {size}</div>
      <div>Gas Limit - {gasLimit}</div>
      <div>Hash - {hash}</div>
      <div>Nonce - {nonce}</div>
    </div>
  )
}

export default BlockDetails;
