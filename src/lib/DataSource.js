import { DataSource } from "typeorm";

// import van de entities
import Feedback from "../models/Feedback.js";
import Operator from "../models/Operator.js";
import Recording from "../models/Recording.js";
import Reviewer from "../models/Reviewer.js";
import Role from "../models/Role.js";
import Category from "../models/Category.js";

// steek die in een array
const entities = [Feedback, Operator, Recording, Reviewer, Role, Category];

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities,
});

export default DS;
