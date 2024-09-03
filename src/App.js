import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TransactionPage from './pages/TransactionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/account/:address" element={<AccountPage/>} />
        <Route path="/transaction/:hash" element={<TransactionPage/>} />
      </Routes>
    </Router>
  );
}

export default App;