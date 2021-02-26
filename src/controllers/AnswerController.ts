import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController {
    
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const repository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await repository.findOne({ 
            id: String(u)
        });

        if(!surveyUser) {
            return response.status(400).json({ message: "Survey or User does not exist"});
        }

        surveyUser.value = Number(value);

        await repository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }