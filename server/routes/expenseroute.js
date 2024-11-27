import express from "express";
import { createExpense, getExpenses,updateExpense, deleteExpense, getAnalytics } from "../controller/expense.js";
import auth from "../Middlewares/auth.js";
const Expenserouter = express.Router();

Expenserouter.post("/", auth, createExpense);
Expenserouter.get("/:id", auth, getExpenses);
Expenserouter.put("/:id", auth, updateExpense);
Expenserouter.delete("/:id", auth, deleteExpense);
Expenserouter.get("/analytics", auth, getAnalytics);

export default Expenserouter;
