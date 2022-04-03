import { Request, Response } from "express";
import { IExpense } from "../../models/interfaces/IExpense";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

export class CreateExpenseController {
    constructor(private createExpenseUseCase: CreateExpenseUseCase){}

    async handle(request: Request, response: Response){
        const { userId, name, value, date } = request.body;

        const expense: IExpense = {name, value, date, userId} as IExpense;

        try{
            await this.createExpenseUseCase.execute(userId, expense).then((expense: IExpense & {_id: any})=>{
                response.status(200).json(expense);
            });
        }catch(error){
            response.status(500).json({msg: 'Could not insert expense on database.'});
        }
    }
}