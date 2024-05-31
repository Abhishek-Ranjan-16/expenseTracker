import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
export const ExpenseTracker = () => {
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const { transactions, transactionTotals } = useGetTransactions();

  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("")
    setTransactionAmount("");
  };
  const { balance, income, expenses } = transactionTotals;
  const { name, profilePhoto } = useGetUserInfo();
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          {profilePhoto && (
            <div className="profile">
              <img src={profilePhoto} alt="" className="profile-photo" />
            </div>
          )}
          <button className="sign-out-btn" onClick={signUserOut}>
            Sign Out
          </button>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>{balance >= 0 ? "₹" + balance : "-₹" + -balance}</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>₹{income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>₹{expenses}</p>
            </div>
          </div>

          <form action="" className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              className="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="Amount"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id } =
              transaction;
            return (
              <li key={id}>
                <h4>{description}</h4>
                <p>
                  ₹{transactionAmount}.
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
