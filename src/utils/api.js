import Web3, { HttpProvider } from 'web3';
import axios from 'axios';

const web3 = new Web3(new HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`));

export const getAccountBalance = async (address) => {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};

export const getRecentTransactions = async (address) => {
  const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
  return response.data.result;
};

export const getTransactionDetails = async (hash) => {
  const txnDetail = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
  const txnStatus = await axios.get(`https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
  const txnReceipt = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);

  const blockDetail = await web3.eth.getBlock(txnDetail.data.result.blockNumber);
  
  const timestamp = Number(blockDetail.timestamp);

  const date = new Date(timestamp * 1000); 

  const formattedDate = date.toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(/, /g, '-').replace(' at', '');

  const mergedResult = {
    ...txnDetail.data.result,
    ...txnStatus.data.result,
    ...txnReceipt.data.result,
    timestamp: `${formattedDate} UTC`,
  };
  return mergedResult;
};

export const getEthToUsdRate = async () => {
  const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
  return response.data.result.ethusd;
};

export const getAccountDetails = async (address) => {
  const transactions = await getRecentTransactions(address);

  if (transactions.length === 0) {
    return {
      latestDaysAgo: null,
      firstDaysAgo: null,
      fundedBy: null,
    };
  }

  const latestTransaction = transactions[0]; 
  const firstTransaction = transactions[transactions.length - 1]; 

  const calculateDaysAgo = (timeStamp) => {
    const transactionDate = new Date(timeStamp * 1000); 
    const currentDate = new Date();
    const diffInTime = currentDate - transactionDate;
    return Math.floor(diffInTime / (1000 * 3600 * 24)); 
  };

  return {
    latestDaysAgo: calculateDaysAgo(latestTransaction.timeStamp),
    firstDaysAgo: calculateDaysAgo(firstTransaction.timeStamp),
    fundedBy: firstTransaction.from, 
  };
};


