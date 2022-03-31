import { Request, Response } from "express";
import { IIncome } from "../../models/interfaces/IIncome";
import { FindAllIncomesUseCase } from "./FindAllIncomesUseCase";

export class FindAllIncomesController {
    constructor(private findAllIncomesUseCase: FindAllIncomesUseCase){}

    async handle(request: Request, response: Response){
        try{
            const incomes: IIncome[] = await this.findAllIncomesUseCase.execute();

            response.status(200).json(incomes);
        }catch(error){
            response.status(500).json({msg: 'Could not find any income on database.'});
        }
    }
}