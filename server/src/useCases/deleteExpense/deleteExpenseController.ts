import { Request, Response } from "express";
import { DeleteExpenseUseCase } from "./deleteExpenseUseCase";

export class DeleteExpenseController {
    constructor(private deleteExpenseUseCase: DeleteExpenseUseCase){}

    async handle(request: Request, response: Response){
        const { userId, id } = request.body;
        
        try{
            await this.deleteExpenseUseCase.execute(userId, id);

            response.status(200).json({msg: 'Successfully deleted expense.'});
        }catch(error){
            response.status(500).json({msg: 'Could not delete expesne.'});
        }
    }
}