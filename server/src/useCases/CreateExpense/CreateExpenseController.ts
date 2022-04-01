import { Request, Response } from "express";
import { IExpense } from "../../models/interfaces/IExpense";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

export class CreateExpenseController {
    constructor(private createExpenseUseCase: CreateExpenseUseCase){}

    async handle(request: Request, response: Response){
        const { name, value, date } = request.body;

        const expense: IExpense = {name, value, date} as IExpense;

        try{
            await this.createExpenseUseCase.execute(expense);

            response.status(200).json({msg: 'Expense created successfully.'});
        }catch(error){
            response.status(500).json({msg: 'Could not insert expense on database.'});
        }
    }
}