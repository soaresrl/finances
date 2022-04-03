import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export default class FindUserUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(email: string){
        const user = await this.userRepository.find(email);

        return user
    }
}