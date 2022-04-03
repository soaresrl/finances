import { IUser } from "../../models/interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from '../../models/implementations/userModel';
import bcrypt from 'bcrypt';

export default class UserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);
        
        const newUser = {
            ...user,
            password: passwordHash
        }

        const createdUser = new User(newUser);

        return await createdUser.save();
    }

    async find(email: string): Promise<IUser> {
        const user: IUser[] = await User.find({ email });
        
        return user[0];
    }

    async updateExpensesIds(userId: string, expensesIds: string[]): Promise<void> {
        await User.findByIdAndUpdate(userId, {expenses_id: expensesIds});
    }

    async updateIncomesIds(userId: string, incomesIds: string[]): Promise<void> {
        await User.findByIdAndUpdate(userId, {incomes_id: incomesIds});
    }

    async getExpensesIds(userId: string): Promise<string[] | undefined> {
        const user = await User.findById(userId);

        const ids = user?.expenses_id.map(id => id.toString());

        return ids;
    }

    async getIncomesIds(userId: string): Promise<string[] | undefined> {
        const user = await User.findById(userId);

        const ids = user?.incomes_id.map(id => id.toString());

        return ids;
    }
}