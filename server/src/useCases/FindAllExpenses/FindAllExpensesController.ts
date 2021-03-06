import { Request, Response } from "express";
import { IExpense } from "../../models/interfaces/IExpense";
import { FindAllExpensesUseCase } from "./FindAllExpensesUseCase";

export class FindAllExpensesController {
    constructor(private findAllExpensesUseCase: FindAllExpensesUseCase){}

    async handle(request: Request, response: Response){
        const { userId } = request.body;
        try{
            const expenses: IExpense[] = await this.findAllExpensesUseCase.execute(userId);
        
            response.status(200).json(expenses);
        }catch(error){
            response.status(500).json({msg: 'Could not find any expenses on database.'});
        }
    }
}