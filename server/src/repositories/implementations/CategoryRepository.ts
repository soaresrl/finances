import { Category } from "../../models/implementations/categoryModel";
import { ICategory } from "../../models/interfaces/ICategory";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export default class CategoryRepository implements ICategoryRepository {
    async create(category: ICategory): Promise<ICategory> {
        const createdCategory: ICategory = await Category.create(category);
        
        return createdCategory;
    }

    async findCategories(userId: string): Promise<ICategory[]> {
        const categories: ICategory[] = await Category.find({userId});

        return categories;
    }

    async delete(id: string): Promise<void> {
        await Category.deleteOne({_id: id});
    }
}