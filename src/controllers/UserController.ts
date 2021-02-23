import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../model/User';

class UserController {
    async store(request: Request, response: Response) {
        const { name, email } = request.body;

        const repository = getRepository(User);

        const user = repository.create({ name, email });

        const userAlreadyExists = await repository.findOne({ email });

        if(userAlreadyExists) {
            response.status(400).json({ message: "User already exists." });
        }

        await repository.save(user);

        response.json(user)
    }
}

export { UserController };