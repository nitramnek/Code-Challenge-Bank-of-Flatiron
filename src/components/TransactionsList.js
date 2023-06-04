import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function TransactionsList({ initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, []);

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting transaction:", error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "description") {
      return a.description && b.description ? a.description.localeCompare(b.description) : 0;
    } else if (sortBy === "category") {
      return a.category && b.category ? a.category.localeCompare(b.category) : 0;
    } else {
      return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    return (
      transaction.description &&
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Search onSearch={setSearchTerm} />
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3
                className={`ui center aligned header ${sortBy === "date" ? "sorted" : ""}`}
                onClick={() => handleSort("date")}
              >
                Date
              </h3>
            </th>
            <th>
              <h3
                className={`ui center aligned header ${
                  sortBy === "description" ? "sorted" : ""
                }`}
                onClick={() => handleSort("description")}
              >
                Description
              </h3>
            </th>
            <th>
              <h3
                className={`ui center aligned header ${
                  sortBy === "category" ? "sorted" : ""
                }`}
                onClick={() => handleSort("category")}
              >
                Category
              </h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
          {filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
