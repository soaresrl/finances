import { IUser } from "../../models/interfaces/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export default class CreateUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(user: IUser){
        try{
            return await this.userRepository.create(user);
        }catch(error){
            throw new Error('Could not create user.');
        }
    }
}