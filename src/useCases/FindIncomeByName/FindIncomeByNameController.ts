import { Request, Response } from "express";
import { IIncome } from "../../models/interfaces/IIncome";
import { FindIncomeByNameUseCase } from "./FindIncomeByNameUseCase";

export class FindIncomeByNameController {
    constructor(private findIncomeByNameUseCase: FindIncomeByNameUseCase){}

    async handle(request: Request, response: Response){
        const { name } = request.body;

        try{            
            const incomes: IIncome[] = await this.findIncomeByNameUseCase.execute(name);

            response.status(200).json(incomes);
        }catch(error){
            response.status(500).json({msg: `Could not find incomes with name: ${name}`})
        }
    }
}