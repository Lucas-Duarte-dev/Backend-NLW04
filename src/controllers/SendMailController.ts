import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const repository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });

        if(!user) {
            return response.status(400).json({ message: "User does not exist." });
        }

        const survey = await surveyRepository.findOne({ id: survey_id });

        if(!survey) {
            return response.status(400).json({ message: "Survey does not exist"})
        }

        const surveyUserAlreadyExists = await repository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        
        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = repository.create({
            user_id: user.id,
            survey_id,
        })
        
        await repository.save(surveyUser);


        variables.id = surveyUser.id

        await SendMailService.execute(email, survey.title ,variables, npsPath);

        return response.json(surveyUser);
    }
}


export { SendMailController }