import { IUser } from "../../models/interfaces/IUser";

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    find(email: string): Promise<IUser>;
    updateExpensesIds(userId: string, expensesIds: string[]): Promise<void>;
    updateIncomesIds(userId: string, incomesIds: string[]): Promise<void>;
    getExpensesIds(userId: string): Promise<string[] | undefined>; 
    getIncomesIds(userId: string): Promise<string[] | undefined>; 
}