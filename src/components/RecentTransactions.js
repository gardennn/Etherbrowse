import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="recent-transactions-container">
      <div className="recent-transactions-header-container">
        <h3 className="recent-transactions-header">Recent Transactions</h3>
        <p className="txn-fee-header">Txn Fee</p>
      </div>
      <ul className="recent-transactions-list">
        {currentTransactions.map((tx) => (
          <li key={tx.hash} className="recent-transaction-item">
            <Link to={`/transaction/${tx.hash}`} className="recent-transaction-link">
              {tx.hash}
            </Link>
            <span className="transaction-details">
              {(parseFloat(tx.gasUsed) * parseFloat(tx.gasPrice) / 1e18).toFixed(6)} ETH
            </span>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <div className="pagination-box">
          <div className="pagination-arrow-container">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-arrow">
              <img src={`/arrow-left.svg`} alt="Left Arrow" className="h-6 w-6" />
            </button>
          </div>
          <div className="pagination-info-container">
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="pagination-arrow-container">
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="pagination-arrow">
              <img src={`/arrow-right.svg`} alt="Right Arrow" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
