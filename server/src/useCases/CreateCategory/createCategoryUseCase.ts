import { ICategory } from "../../models/interfaces/ICategory";
import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";

export default class CreateCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository){}

    async execute(category: ICategory){
        try{
            const createdCategory = await this.categoryRepository.create(category);
            
            return createdCategory;
        }catch(error){
            throw new Error('Could not create category');
        }
    }
}