import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);

  const handleTransactionAdded = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div>
      <AddTransactionForm onTransactionSubmit={handleTransactionAdded} />
      <TransactionsList initialTransactions={transactions} />
    </div>
  );
}

export default AccountContainer;
