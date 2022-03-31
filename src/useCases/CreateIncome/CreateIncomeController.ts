import { Request, Response } from "express";
import { IIncome } from "../../models/interfaces/IIncome";
import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

export class CreateIncomeController {
    constructor(private createIncomeUseCase: CreateIncomeUseCase){}

    async handle(request: Request, response: Response){
        try{
            const {name, value, date} = request.body;

            const income: IIncome = {name, value, date} as IIncome;

            this.createIncomeUseCase.execute(income);

            response.status(200).json({msg: 'Created income succesfully.'});
        } catch (error){
            response.status(500).json({msg: 'Could not create income on database.'});
        }
    }
}