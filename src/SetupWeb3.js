import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskOnboarding from '@metamask/onboarding'
import React, { useState } from 'react';

export default function SetupWeb3 (props) {
  const { accounts, setAccounts, setProvider } = props;
  const [isOnboarding, setOnboarding] = useState(false);
  const [isConnecting, setConnecting] = useState(false);

  if (window['ethereum'] && accounts.length === 0) {
    if (isConnecting) {
      return (<div><p>Requesting wallet connection.</p></div>)
    }

    return (<button onClick={async () => {
        const provider = await detectEthereumProvider();
        setConnecting(true);
        const accounts = await provider.request({ method: 'eth_requestAccounts' })
        setConnecting(false);
        setProvider(provider);
        setAccounts(accounts);
      }}>Connect MetaMask</button>
    );

  } else if (!isOnboarding) {
    return (<div>
      <p>To use this application or redeem an allowance link, you need to install MetaMask:</p>
      <button onClick={() => {
        setOnboarding(true);
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding(); 
      }
      }>Install MetaMask to Get Started</button>

    </div>)
  } else {
    return (<div>
      <p>Finish installing MetaMask and come back here to resume.</p>
    </div>)
  }




}