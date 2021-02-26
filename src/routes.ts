import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { AnswerController } from './controllers/AnswerController';

import { UserController } from './controllers/UserController';
import { NpsController } from './controllers/NpsController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answersController = new AnswerController();
const npsController = new NpsController();

routes.post('/users', userController.store);

routes.post('/surveys', surveyController.store);
routes.get('/surveys', surveyController.index);

routes.post('/sendMail', sendMailController.execute);

routes.get('/answers/:value', answersController.execute);

routes.get('/nps/:survey_id', npsController.execute)

export default routes;