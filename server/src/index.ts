import express, { Request, Response } from "express";
import * as database from "./database";
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createCategoryController, createExpenseController, createIncomeController, createUserController, deleteExpenseController, deleteIncomeController, filterExpenseByCategoryController, findAllCategoriesController, findAllExpensesController, findAllIncomesController, findExpenseByNameController, findIncomeByNameController, findUserController, findUserUseCase } from "./useCases";

dotenv.config({ path: __dirname+'/.env' });

const app = express();
app.use(express.json());

const PORT = 3001;

function checkToken(req: Request, res: Response, next: any){
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if(!token){
        return res.status(401).json({msg: 'Access denied'});
    }

    try{
        const secret = process.env.SECRET;

        jwt.verify(token, secret as string);

        next();
    }catch(error){
        res.status(400).json({msg: 'invalid token.'});
    }
}

// Default route

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Expenses routes

app.post('/expenses', checkToken, async (req, res) => {
    return findAllExpensesController.handle(req, res);
});

app.get('/expenses/name', checkToken, async (req, res) => {
    return findExpenseByNameController.handle(req, res);
});

app.post('/expenses/create', checkToken, async (req, res)=>{
    return createExpenseController.handle(req, res);
});

app.post('/expenses/delete', checkToken, async (req, res)=>{
    return deleteExpenseController.handle(req, res);
});

app.post('/expenses/filterByCategory', checkToken, async (req, res)=>{
    return filterExpenseByCategoryController.handle(req, res);
});

// Incomes routes

app.post('/incomes', checkToken, async (req, res) => {
    return findAllIncomesController.handle(req, res);
});

app.get('/incomes/name', checkToken,  async (req, res) => {
    return findIncomeByNameController.handle(req, res);
});

app.post('/incomes/create', checkToken, async (req, res)=>{
    return createIncomeController.handle(req, res);
});

app.post('/incomes/delete', checkToken, async (req, res)=>{
    return deleteIncomeController.handle(req, res);
});

// Categories routes

app.post('/categories/create', checkToken, async (req, res)=>{
    return createCategoryController.handle(req, res);
});

app.post('/categories', checkToken, async (req, res)=>{
    return findAllCategoriesController.handle(req, res);
});

// Auth routes

app.post('/auth/create', async (req, res) => {
    return createUserController.handle(req, res);
});

app.post('/auth/login', async (req, res) => {
    //return createUserController.handle(req, res);
    const { email, password } = req.body;

    const user = await findUserUseCase.execute(email);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(isPasswordCorrect){
        try{
            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: user._id
            }, secret as string);

            res.status(200).json({msg: 'Authentication succeeded.', userId: user._id, token});

        }catch(error){
            res.status(500).json({msg: 'Authentication failed.'});
        }
    }
});


app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`);
});

database.connect();