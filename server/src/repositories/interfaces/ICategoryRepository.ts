import { ICategory } from "../../models/interfaces/ICategory";

export interface ICategoryRepository {
    create(category: ICategory): Promise<ICategory>;
    delete(id: string): Promise<void>;
    findCategories(userId: string): Promise<ICategory[]>;
}