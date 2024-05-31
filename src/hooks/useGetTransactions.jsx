import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const { userID } = useGetUserInfo();
  const [transactions, setTransactions] = useState([]);
  const transactionCollectionRef = collection(db, "transactions");
  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID)
      );

      orderBy("createdAt");

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          income: totalIncome,
          expenses: totalExpenses,
        });
      });
    } catch (err) {
      console.log(err);
    }

    return () => unsubscribe();
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
