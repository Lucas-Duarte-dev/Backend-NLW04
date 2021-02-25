import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
    async store(request: Request, response: Response) {
        const { name, email } = request.body;

        const repository = getCustomRepository(UserRepository);

        const user = repository.create({ name, email });

        const userAlreadyExists = await repository.findOne({ email });

        if(userAlreadyExists) {
            return response.status(400).json({ message: "User already exists." });
        }

        await repository.save(user);

        return response.status(201).json(user)
    }
}

export { UserController };
