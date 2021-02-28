import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import AppError from '../Errors/AppError';

class UserController {
    async store(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio"),
            email: yup.string().email().required("Nome é obrigatorio"),
        })

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const repository = getCustomRepository(UserRepository);

        const user = repository.create({ name, email });

        const userAlreadyExists = await repository.findOne({ email });

        if(userAlreadyExists) {
            throw new AppError('User already exists');
        }

        await repository.save(user);

        return response.status(201).json(user)
    }
}

export { UserController };
