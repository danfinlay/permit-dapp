import { signERC2612Permit } from 'eth-permit';
import React, { useState } from 'react';
import { default as AddressInput } from './components/AddressInput';
import { default as EtherInput } from './components/EtherInput';
import {
  useHistory 
} from "react-router-dom";
import BigNumber from 'bignumber.js'
const bnMultiplier = (new BigNumber(10)).pow(18);

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
  const history = useHistory();
  const { accounts, provider } = props;
  const [sender, setSender] = useState(accounts[0]);
  const [selectedToken, setSelectedToken] = useState(supportedTokens[0].address);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [errMsg, setErr] = useState(undefined);

  return (<div>
    <h2>Grant</h2>
    <div>
      <p>What account to grant from?</p>
      <select value={sender}
        onChange={(event) => {
          setSender(event.target.selectValue);
        }}>
        {accounts.map((address) => {
          return <option value={address} key={address}>
            {address}
          </option>
        })}
      </select>
  
      <p>Who to grant this allowance to?</p>
      <AddressInput
        autoFocus
        ensProvider={provider}
        placeholder="Enter address"
        value={recipient}
        onChange={setRecipient}
      />

      {/* <input id="recipientAddress" placeholder="0x......" onChange={(event) => {
        setRecipient(event.target.value);
      }}></input> */}
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

      <EtherInput
        autofocus
        value={amount}
        placeholder="Enter amount"
        onChange={value => {
          setAmount(value);
        }}
      /><br/>

      {/* <input id="quantity" placeholder="0" type="number" onChange={(event) => {
        setAmount(event.target.value);
      }}></input><br/> */}
      <div onClick={async (event) => {
        event.preventDefault();
        try {
          console.log(`let's try to convert ${typeof amount}`)

          let bnVal = new BigNumber(amount);
          console.log(`the ${amount} made the bn ${bnVal.toFixed()}`)
          bnVal = bnVal.mul(bnMultiplier)
          console.log(`times 10^18 is ${bnVal.toFixed()}`)

          const result = await signERC2612Permit(window.ethereum, selectedToken, sender, recipient, bnVal.toFixed());
          console.dir(result);
          const json = JSON.stringify(result);
          const param = encodeURI(json);
          history.push(`/redeem/${param}`)        
        } catch (err) {
          setErr(err.message);
        }
      }} className="button">Create Grant</div>
      {errMsg ? <p className="error">{errMsg}</p> : undefined}
    </div>
  </div>)
}