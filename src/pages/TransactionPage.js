import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TransactionInfo from '../components/TransactionInfo';
import { getTransactionDetails } from '../utils/api';

const TransactionPage = () => {
  const { hash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) {
      hasFetchedData.current = false;
      return;
    }
    hasFetchedData.current = true;

    const fetchTransaction = async () => {
      const transactionDetails = await getTransactionDetails(hash);
      setTransaction(transactionDetails);
    };

    fetchTransaction();
  }, [hash]);

  return (
    <div>
      {transaction ? (
        <TransactionInfo transaction={transaction} />
      ) : (
        <div className='loader-container'>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
