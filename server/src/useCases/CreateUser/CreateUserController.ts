import { Request, Response } from "express";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase){}

    async handle(request: Request, response: Response){
        const user = request.body;
        try{
            const createdUser = await this.createUserUseCase.execute(user);
            response.status(200).json(createdUser);
        }catch(error){
            response.status(500).json({msg: 'Could not create user.'});
        }
    }
}