
import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch transactions when the query changes
    fetchTransactions();
  }, [query]);

  const fetchTransactions = () => {
    // Construct the URL based on the query
    const url = query ? `http://localhost:8001/transactions?q=${query}` : 'http://localhost:8001/transactions';

    // Fetch transactions from the server
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

  const addTransaction = (newTransaction) => {
    // Add the new transaction to the state
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
