import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {
    async execute(request: Request, response: Response) {
       const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);
    
        const surveys = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractors = surveys.filter(survey => survey.value >= 0 && survey.value <= 6).length;

        const promoters = surveys.filter(survey => survey.value >= 9 && survey.value <= 10).length;

        const totalAnswers = surveys.length;

        const calculate = Number((((promoters - detractors) / totalAnswers ) * 100).toFixed(2));

        return response.json({ detractors, promoters, totalAnswers, NPS: calculate });
    }
}

export {NpsController}