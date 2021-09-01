import { signERC2612Permit } from 'eth-permit';
import React, { useState } from 'react';

const supportedTokens = [
  {
    name: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  },
  {
    name: 'WETH v10',
    address: '0xf4bb2e28688e89fcce3c0580d37d36a7672e8a9f',
  }
]

export default function Grant (props) {
  const { accounts, provider } = props;
  const [sender, setSender] = useState(accounts[0]);
  const [selectedToken, setSelectedToken] = useState(supportedTokens[0].address);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');

  return (<div>
    <h2>Grant</h2>
    <div>
      <p>What account to grant from?</p>
      <select value={sender}
        onChange={(event) => {
          setSelectedToken(event.target.selectValue);
        }}>
        {accounts.map((address) => {
          return <option value={address} key={address}>
            {address}
          </option>
        })}
      </select>
  
      <p>Who to grant this allowance to?</p>
      <input id="recipientAddress" placeholder="0x......" onChange={(event) => {
        setRecipient(event.target.value);
      }}></input>
      <p>What token do you want to grant?</p>
      <select value={selectedToken}
        onChange={(event) => {
          setSelectedToken(event.target.selectValue);
        }}>
        {supportedTokens.map((token) => {
          return <option value={token.address} key={token.address}>
            {token.name}
          </option>
        })}
      </select>
      <p>How many of those tokens would you like to grant?</p>
      <input id="quantity" placeholder="0" type="number" onChange={(event) => {
        setAmount(event.target.value);
      }}></input><br/>
      <button onClick={async () => {
        const result = await signERC2612Permit(window.ethereum, selectedToken, sender, recipient, amount);
 
      }}>Create Grant</button>
    </div>
  </div>)
}