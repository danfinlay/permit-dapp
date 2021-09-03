import React from "react";
import Jazzicon from 'react-jazzicon'
import { toChecksumAddress } from 'ethereumjs-util';

// provides a blockie image for the address using "react-blockies" library

export default function Blockie(props) {
  if (!props.address || typeof props.address.toLowerCase !== "function") {
    return <span />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Jazzicon seed={jsNumberForAddress(props.address)} diameter={25} {...props} />
  // eslint-disable-next-line react/jsx-props-no-spreading
  // return <Blockies seed={props.address.toLowerCase()} {...props} />;

}

function jsNumberForAddress(lowCaseAddr) {
  const address = toChecksumAddress(lowCaseAddr);
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  return seed;
}