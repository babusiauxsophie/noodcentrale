import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class CategoryFactory extends Factory {
  constructor() {
    // roep de constructor van de parent class aan
    super();

    this.categories = ["politie", "brandweer", "brand", "ongeval"];
  }

  // generate one category
  async make() {
    await this.makeMany();
  }

  // generate many categories
  async makeMany() {
    for (const category of this.categories) {
      const record = await this.insert(category);
      this.inserted.push(record);
    }
  }

  // insert in the database
  async insert(name) {
    const categoryRepo = DataSource.getRepository("Category");

    // check if record exists
    let record = await categoryRepo.findOne({ where: { name } });
    if (record) return record;

    // it doesn't exist, so create it
    record = await categoryRepo.save({ name });

    // return the record
    return record;
  }
}

export default new CategoryFactory();
