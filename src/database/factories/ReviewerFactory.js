// import necessary factory and data source
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import RoleFactory from "./RoleFactory.js";

// import faker thingz
import { faker } from "@faker-js/faker";

class ReviewerFactory extends Factory {
  constructor() {
    super();
    this.roles = RoleFactory.roles;
  }

  async make() {
    // get a random role
    const randomIndex = Math.floor(Math.random() * this.roles.length);
    const randomRole = this.roles[randomIndex];
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const reviewer = {
      firstname: firstName,
      lastname: lastName,
      email: `${firstName}.${lastName}@noodcentrale.be`,
      password: faker.internet.password(),
      isAdmin: Math.random() > 0.9 ? true : false,
    };
    const record = await this.insert(reviewer, randomRole);

    this.inserted.push(await record);
  }

  async insert(reviewer, role) {
    const repo = DataSource.getRepository("Reviewer");

    // check if reviewer not in database yet?
    let record = await repo.findOne({ where: { email: reviewer.email } });
    if (record) return record;

    // get or create the reviewer role
    const roleRecord = await RoleFactory.insert(role);

    // save the reviewer and link it to the role
    record = await repo.insert({
      ...reviewer,
      role: roleRecord,
    });
    // console.log(roleRecord);
    return record;
  }
}

export default new ReviewerFactory();
