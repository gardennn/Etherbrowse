# Etherbrose

## Ethereum Search Tool

This is a simple Ethereum search tool built with React. Users can search for wallet addresses and transactions, displaying relevant information such as balance, recent transactions, and transaction details. The tool automatically detects the input format (address or transaction hash) and displays the corresponding results.

## Features

- **Home Page**: 
  - Display the tool's name and a brief introduction.
  - A search bar where users can input a wallet address or transaction hash to view the relevant information.
  - Automatic detection of input type (address or transaction hash).

- **Wallet Address Search**:
  - Displays the balance of the searched wallet address.
  - Shows recent transactions associated with the address, with links to detailed transaction views.
  - Route: `/account/<address>`

- **Transaction Search**:
  - Displays detailed information about the transaction, including timestamp, block number, sender, receiver, transaction type, and transaction amount.
  - Route: `/transaction/<hash>`

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/
   ```

2. **Install Dependencies:**

   ```bash
   cd etherbrowse
   npm install
   ```

3. **Set up Environment Variables:**

   - Create a `.env` file at the root of the project.
   - Add the following environment variables:
   ```
   REACT_APP_ETHERSCAN_API_KEY=<Your Etherscan API Key>
   REACT_APP_INFURA_PROJECT_ID=<Your Infura Project ID>
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

**Project Structure:**

```
etherbrowse/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   └── index.js
└── public/
    └── index.html
```

**Technologies Used:**

- **Frontend:** React, Axios, Tailwind CSS
- **API:** [Etherscan API](https://docs.etherscan.io/)

**The application is deployed and accessible at the following URL::**

- **Online Environment:** [Etherbrowse]https://your-deployed-app-url.com