import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TransactionInfo = ({ transaction }) => {
  const [status, setStatus] = useState('Loading');

  function determineTransactionType(transaction) {
    if (transaction.contractAddress) {
      return "Contract Deployment";
    } else if (transaction.input !== "0x") {
      return "Contract Interaction";
    } else {
      return "Transfer";
    }
  }
  
  const transactionType = determineTransactionType(transaction);

  useEffect(() => {
    if (transaction) {
      const determineStatus = () => {
        if (!transaction.blockNumber) {
          return 'Pending';
        } else if (transaction.status === '0x1') {
          return 'Success';
        } else if (transaction.status === '0x0') {
          return 'Failed';
        }
        return 'Unknown';
      };
      setStatus(determineStatus());
    }
  }, [transaction]);

  return (
    <div className="transaction-info-container">
      <h2 className="section-title">Transaction Details</h2>
      
      <div className="transaction-details">
        <div className="detail-item">
          <span className="label">Transaction Hash:</span>
          <span className="value">{transaction.hash}</span>
        </div>

        <div className="detail-item">
          <span className="label">Status:</span>
          <span className={`status ${status === 'Success' ? 'status-success' : status === 'Failed' ? 'status-failed' : 'status-pending'}`}>
            {status}
          </span>
        </div>

        <div className="detail-item">
          <span className="label">Method:</span>
          <span className="value">{transactionType}</span>
        </div>

        <div className="detail-item">
          <span className="label">Block Number:</span>
          <span className="value link">{parseInt(transaction.blockNumber, 16)}</span>
        </div>

        <div className="detail-item">
          <span className="label">Timestamp:</span>
          <span className="value">{transaction.timestamp}</span>
        </div>

        <div className="detail-item">
          <span className="label">From:</span>
          <span className="value link break-all">
            <Link to={`/account/${transaction.from}`}>
              {transaction.from}
            </Link>
          </span>
        </div>

        <div className="detail-item">
          <span className="label">To:</span>
          <span className="value link break-all">
            <Link to={`/account/${transaction.to}`}>
              {transaction.to}
            </Link>
          </span>
        </div>

        <div className="detail-item">
          <span className="label">Value:</span>
          <span className="value">{parseInt(transaction.value, 16)/10**18} ETH</span>
        </div>

        <div className="detail-item">
          <span className="label">Transaction Fee:</span>
          <span className="value">{(parseInt(transaction.gasUsed, 16) * parseInt(transaction.gasPrice, 16) / 1e18)} ETH</span>
        </div>

        <div className="detail-item-last">
          <span className="label">Gas Price:</span>
          <span className="value">{(transaction.gasPrice / 1e9)} Gwei</span>
        </div>
      </div>

    </div>
  );
};

export default TransactionInfo;
