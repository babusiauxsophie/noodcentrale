import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class RoleFactory extends Factory {
  constructor() {
    // roep de constructor van de parent class aan
    super();

    this.roles = ["medisch", "niet-medisch"];
  }

  // generate one role
  async make() {
    await this.makeMany();
  }

  // generate many roles
  async makeMany() {
    for (const role of this.roles) {
      const record = await this.insert(role);
      this.inserted.push(record);
    }
  }

  // insert in the database
  async insert(name) {
    const roleRepo = DataSource.getRepository("Role");

    // check if record exists
    let record = await roleRepo.findOne({ where: { name } });
    if (record) return record;

    // it doesn't exist, so create it
    record = await roleRepo.save({ name });

    // return the record
    return record;
  }
}

export default new RoleFactory();
