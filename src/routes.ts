import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';

import { UserController } from './controllers/UserController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

routes.post('/users', userController.store)

routes.post('/surveys', surveyController.store)
routes.get('/surveys', surveyController.index)

routes.post('/sendMail', sendMailController.execute)

export default routes;