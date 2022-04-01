import express from "express";
import * as database from "./database";
import { IIncome } from "./models/interfaces/IIncome";
import { createExpenseController, createIncomeController, findAllExpensesController, findAllIncomesController, findExpenseByNameController, findIncomeByNameController } from "./useCases";

const app = express();
app.use(express.json());

const PORT = 3001;

// Default route

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Expenses routes

app.get('/expenses', async (req, res) => {
    return findAllExpensesController.handle(req, res);
});

app.get('/expenses/name', async (req, res) => {
    return findExpenseByNameController.handle(req, res);
});

app.post('/expenses/create', async (req, res)=>{
    return createExpenseController.handle(req, res);
});

// Incomes routes

app.get('/incomes', async (req, res) => {
    return findAllIncomesController.handle(req, res);
});

app.get('/incomes/name', async (req, res) => {
    return findIncomeByNameController.handle(req, res);
});

app.post('/incomes/create', async (req, res)=>{
    return createIncomeController.handle(req, res);
});

app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`);
});

database.connect();