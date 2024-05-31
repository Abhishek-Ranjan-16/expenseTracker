import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpenseTracker } from "./pages/exp";

const App = () => {
  return <div> 
    <Router>
        <Routes>
            <Route path="/" exact element={<Auth></Auth>}/> 
            <Route path="/expense-tracker" exact element={<ExpenseTracker></ExpenseTracker>}/> 
        </Routes>
    </Router>
  </div>;
};

export default App;
