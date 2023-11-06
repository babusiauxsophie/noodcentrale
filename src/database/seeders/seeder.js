import "dotenv/config";
import minimist from "minimist";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from "../../models/index.js";
import {
  RoleFactory,
  CategoryFactory,
  ReviewerFactory,
  OperatorFactory,
  RecordingFactory,
  FeedbackFactory,
  Category_RecordingFactory,
} from "../factories/index.js";

const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_URL,
  entities
);

const { factory, amount = 1 } = minimist(process.argv.slice(2));

const logResponse = (records) => {
  console.log(`${records.length} records inserted.`);
  console.log("Inserted records:", records);
};

switch (factory) {
  case "role":
    dbSeeder.run(RoleFactory).then(logResponse);
    break;
  case "category":
    dbSeeder.run(CategoryFactory).then(logResponse);
    break;
  case "reviewer":
    dbSeeder.run(ReviewerFactory, amount).then(logResponse);
    break;
  case "operator":
    dbSeeder.run(OperatorFactory, amount).then(logResponse);
    break;
  case "feedback":
    dbSeeder.run(FeedbackFactory, amount).then(logResponse);
    break;
  case "recording":
    dbSeeder.run(RecordingFactory, amount).then(logResponse);
    break;
  case "category_recording":
    dbSeeder.run(Category_RecordingFactory).then(logResponse);
    break;
}

// npm run seed -- --factory=category  //standalone en hardcoded aantal
// npm run seed -- --factory=role //standalone en hardcoded aantal
// npm run seed -- --factory=operator --amount=25 //standalone
// npm run seed -- --factory=reviewer --amount=25 //hangt af van role, dus eerst role seeden (25 is variabel)
// npm run seed -- --factory=recording --amount=25 //hangt af van operator, dus eerst operators seeden
// npm run seed -- --factory=feedback --amount=25 //hangt af van recording en reviewer, dus eerst die seeden
// npm run seed -- --factory=category_recording //hangt af van category en recording, dus eerst die seeden