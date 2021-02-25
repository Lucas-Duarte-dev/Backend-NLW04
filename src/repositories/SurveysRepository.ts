import { EntityRepository, Repository } from "typeorm";
import { Surveys } from "../model/Surveys";

@EntityRepository(Surveys)
class SurveysRepository extends Repository<Surveys> {}

export { SurveysRepository } 