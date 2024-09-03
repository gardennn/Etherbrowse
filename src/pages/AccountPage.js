import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import AccountInfo from '../components/AccountInfo';
import RecentTransactions from '../components/RecentTransactions';
import { getAccountBalance, getRecentTransactions, getEthToUsdRate, getAccountDetails } from '../utils/api';

const AccountPage = () => {
  const { address } = useParams();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [ethToUsdRate, setEthToUsdRate] = useState(null);
  const [accountDetails, setAccountDetails] = useState({
    latestDaysAgo: null,
    firstDaysAgo: null,
    fundedBy: null,
  });

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) {
      hasFetchedData.current = false;
      return;
    }
    hasFetchedData.current = true;

    const fetchData = async () => {
      const accountBalance = await getAccountBalance(address);
      setBalance(accountBalance);

      const recentTransactions = await getRecentTransactions(address);
      setTransactions(recentTransactions);

      const rate = await getEthToUsdRate();
      setEthToUsdRate(rate);

      const details = await getAccountDetails(address);
      setAccountDetails(details);
    };

    fetchData();
  }, [address]);

  const truncateAddress = (addr) => {
    return addr ? `${addr.slice(0, 10)}...${addr.slice(-8)}` : '';
  };

  return (
    <div className="account-page-container">
      <div className="flex">
        <AccountInfo address={address} balance={balance} ethToUsdRate={ethToUsdRate} />
        <div className="more-info-container">
          <div className="more-info-header">More Info</div>
          <div className="more-info-content">
            <p>Latest: {accountDetails.latestDaysAgo} days ago</p>
            <p>First: {accountDetails.firstDaysAgo} days ago</p>
            <p>
              Funded By:{" "}
              <Link
                to={`/account/${accountDetails.fundedBy}`}
                className="text-blue-500 hover:text-blue-700"
                title={accountDetails.fundedBy}
              >
                {truncateAddress(accountDetails.fundedBy)}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default AccountPage;
