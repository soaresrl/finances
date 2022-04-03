import { Request, Response } from "express";
import { IIncome } from "../../models/interfaces/IIncome";
import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

export class CreateIncomeController {
    constructor(private createIncomeUseCase: CreateIncomeUseCase){}

    async handle(request: Request, response: Response){
        const {userId, name, value, date} = request.body;

        const income: IIncome = {name, value, date, userId} as IIncome;

        try{
            this.createIncomeUseCase.execute(userId, income).then((income: IIncome & {_id: any})=>{
                response.status(200).json(income);
            });
        } catch (error){
            response.status(500).json({msg: 'Could not create income on database.'});
        }
    }
}