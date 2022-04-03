import { Request, Response } from "express";
import { DeleteIncomeUseCase } from "./deleteIncomeUseCase";

export class DeleteIncomeController {
    constructor(private deleteIncomeUseCase: DeleteIncomeUseCase){}

    async handle(request: Request, response: Response){
        const { userId, id } = request.body;
        
        try{
            await this.deleteIncomeUseCase.execute(userId, id);

            response.status(200).json({msg: 'Successfully deleted expense.'});
        }catch(error){
            response.status(500).json({msg: 'Could not delete expesne.'});
        }
    }
}