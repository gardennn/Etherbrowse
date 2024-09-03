import React from 'react';

const AccountInfo = ({ balance, address, ethToUsdRate }) => {

  const safeEthToUsdRate = ethToUsdRate ? parseFloat(ethToUsdRate).toFixed(2) : "0.00";
  const ethValueInUsd = ethToUsdRate ? (parseFloat(ethToUsdRate) * parseFloat(balance)).toFixed(2) : "0.00";

  return (
    <div className="account-info-container">
      <div className="account-info-left">
        <h2 className="account-info-header">Address: {address}</h2>
        <p className="account-info-balance">Balance: {balance} ETH</p>
        <p className="eth-value">${ethValueInUsd} (@ ${safeEthToUsdRate}/ETH)</p>
      </div>
    </div>
  );
};

export default AccountInfo;
