import { Request, Response } from "express";
import FindAllCategoriesUseCase from "./findAllCategoriesUseCase";

export default class FindAllCategoriesController {
    constructor(private findAllCategoriesUseCase: FindAllCategoriesUseCase){}

    async handle(request: Request, response: Response){
        const { userId } = request.body;

        try{
            const categories = await this.findAllCategoriesUseCase.execute(userId);

            response.status(200).json(categories);
        }catch(error){
            response.status(500).json({msg: 'Could not find any categories for this user.'});
        }
    }
}