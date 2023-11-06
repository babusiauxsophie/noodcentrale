// import necessary factory and data source
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import OperatorFactory from "./OperatorFactory.js";

// import faker thingz
import { faker } from "@faker-js/faker";

class RecordingFactory extends Factory {
  constructor() {
    super();

    this.recordings = ["example--1.mp3", "example--2.mp3", "example--3.mp3"];

    // // console.log( OperatorFactory.operators);
    // const operatorCount = OperatorFactory.operators.count;
    // // console.log(OperatorFactory.operators.length);
  }

  async make() {
    const repo = DataSource.getRepository("Operator");
    const randomIndex = Math.floor(Math.random() * this.recordings.length);
    // // console.log(randomIndex);
    const min = 1672581289000;
    const max = 1685627689000;

    // // console.log(await repo.count());
    const randomOperatorId =
      Math.floor(Math.random() * (await repo.count())) + 1;
    // console.log(randomOperatorId);
    const randomOperator = await repo.findOne({
      where: { id: randomOperatorId },
    });
    // console.log(randomOperator);

    const recording = {
      soundpath: this.recordings[randomIndex],
      date: Math.floor(Math.random() * (max - min + 1) + min),
    };
    const record = await this.insert(recording, randomOperator);

    this.inserted.push(await record);
  }

  async insert(recording, operator) {
    const repo = DataSource.getRepository("Recording");

    // get or create the recording operator
    const operatorRecord = await OperatorFactory.insert(operator);

    // save the recording and link it to the operator
    let record = await repo.insert({
      ...recording,
      operator: operatorRecord,
    });
    // console.log(operatorRecord);
    return record;
  }
}

export default new RecordingFactory();
