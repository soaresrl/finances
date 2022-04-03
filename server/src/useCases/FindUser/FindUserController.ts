import { Request, Response } from "express";
import FindUserUseCase from "./FindUserUseCase";

export default class FindUserController{
    constructor(private findUserUseCase: FindUserUseCase){}

    async handle(request: Request, response: Response){
        const { email } = request.body;
        try{
            const user = this.findUserUseCase.execute(email);
            
            response.status(200).json(user);
        }catch(error){
            response.status(500).json({msg: `User with email ${email} doesn't exist.`});
        }
    }
}