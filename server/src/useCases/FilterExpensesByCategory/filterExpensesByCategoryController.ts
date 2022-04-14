import { Request, Response } from "express";
import FilterExpensesByCategoryUseCase from "./filterExpensesByCategoryUseCase";

export default class FilterExpensesByCategoryController {
    constructor(private filterExpensesByCategoryUseCase: FilterExpensesByCategoryUseCase){}

    async handle(request: Request, response: Response){
        const { userId, category } = request.body;

        try{
            const expenses = await this.filterExpensesByCategoryUseCase.execute(userId, category.type);

            response.status(200).json(expenses);
        } catch(error){ 
            response.status(500).json({msg: 'Could not handle to find expenses filtered by category.'});
        }
    }
}