import { Request, Response } from "express";
import { ICategory } from "../../models/interfaces/ICategory";
import CreateCategoryUseCase from "./createCategoryUseCase";

export default class CreateCategoryController{
    constructor(private createCategoryUseCase: CreateCategoryUseCase){}

    async handle(request: Request, response: Response){
        const { type, userId } = request.body;

        try{
            const category = {type, userId} as ICategory;

            const createdCategory = this.createCategoryUseCase.execute(category);

            response.status(200).json(createdCategory);
        } catch(error){
            response.status(500).json({msg: 'Could not create category.'});
        }
    }
}