// import necessary factory and data source
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

// import faker thingz
import { faker } from "@faker-js/faker";

class OperatorFactory extends Factory {
  constructor() {
    super();
  }

  async make() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const min = 1672581289000;
    const max = 1685627689000;

    const operator = {
      firstname: firstName,
      lastname: lastName,
      email: `${firstName}.${lastName}@noodcentrale.be`,
      lastReviewed: Math.floor(Math.random() * (max - min + 1) + min),
    };
    const record = await this.insert(operator);

    this.inserted.push(await record);
  }

  async insert(operator) {
    const repo = DataSource.getRepository("Operator");

    // check if operator not in database yet?
    let record = await repo.findOne({ where: { email: operator.email } });
    if (record) return record;

    record = await repo.insert({
      ...operator,
    });
    return record;
  }
}

export default new OperatorFactory();
