import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
    async store(request: Request, response: Response) {
        const { title, description } = request.body;

        const repository = getCustomRepository(SurveysRepository);

        const survey = repository.create({ title, description });

        await repository.save(survey);

        return response.status(201).json(survey);
    }

    async index(request: Request, response: Response) {
        const repository = getCustomRepository(SurveysRepository);

        const survey = await repository.find();

        return response.status(200).json(survey);
    }
}

export { SurveyController }