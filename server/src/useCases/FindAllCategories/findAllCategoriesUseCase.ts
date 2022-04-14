import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";

export default class FindAllCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRepository){}

    async execute(userId: string){
        try{
            const categories = await this.categoryRepository.findCategories(userId);

            return categories;
        } catch(error) {
            throw new Error('Could not find any categories for this user.');
        }
    }
}