import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';

import { UserController } from './controllers/UserController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();

routes.post('/user', userController.store)
routes.post('/surveys', surveyController.store)
routes.get('/surveys', surveyController.index)

export default routes;