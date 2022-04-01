import { Request, Response } from "express";
import { IExpense } from "../../models/interfaces/IExpense";
import { FindExpenseByNameUseCase } from "./FindExpenseByNameUseCase";
export class FindExpenseByNameController {
    constructor(private findExpenseByNameUseCase: FindExpenseByNameUseCase){}

    async handle(request: Request, response: Response){
        const { name } = request.body;

        try{
            const expenses: IExpense[] = await this.findExpenseByNameUseCase.execute(name);

            response.status(200).json(expenses);
        }catch(error){
            response.status(500).json({msg: `Couldn't find expense with name ${name} on database.`});
        }
    }
}