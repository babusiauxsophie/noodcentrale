// import necessary factory and data source
import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";
// import RecordingFactory from './RecordingFactory.js';
// import ReviewerFactory from './ReviewerFactory.js';

// import faker thingz
import { faker } from "@faker-js/faker";

class FeedbackFactory extends Factory {
  constructor() {
    super();
    // this.roles = RoleFactory.roles;
  }

  async make() {
    const feedbackJson = {
      aannametijd: Math.floor(Math.random() * 5) + 1,
      assertiviteit: Math.floor(Math.random() * 5) + 1,
      empathie: Math.floor(Math.random() * 5) + 1,
      correct: Math.floor(Math.random() * 5) + 1,
      respectvol: Math.floor(Math.random() * 5) + 1,
      comment: faker.lorem.paragraph(),
    };

    const feedback = {
      feedback: JSON.stringify(feedbackJson),
    };

    const randomRecording = await DataSource.getRepository("Recording").findOne(
      {
        where: {
          id:
            Math.floor(
              Math.random() *
                (await DataSource.getRepository("Recording").count())
            ) + 1,
        },
      }
    );
    console.log(randomRecording);
    const randomReviewer = await DataSource.getRepository("Reviewer").findOne({
      where: {
        id:
          Math.floor(
            Math.random() * (await DataSource.getRepository("Reviewer").count())
          ) + 1,
      },
    });
    console.log(randomReviewer);
    const operatorReviewer = await DataSource.getRepository("Operator").findOne(
      {
        where: {
          id:
            Math.floor(
              Math.random() *
                (await DataSource.getRepository("Operator").count())
            ) + 1,
        },
      }
    );
    console.log(operatorReviewer);
    const record = await this.insert(
      feedback,
      randomRecording,
      randomReviewer,
      operatorReviewer
    );
    console.log("record" + record);
    this.inserted.push(await record);
  }

  async insert(feedback, recording, reviewer, operator) {
    const repo = DataSource.getRepository("Feedback");

    // get or create the feedback role
    // const recordingRecord = await RecordingFactory.find(recording);
    // console.log('recordingRecord.id');
    // console.log(recordingRecord.id);
    // const reviewerRecord = await ReviewerFactory.insert(reviewer);
    // console.log(reviewerRecord.id);
    // save the feedback and link it to the role
    let record = await repo.insert({
      ...feedback,
      recording: recording,
      reviewer: reviewer,
      operator: operator,
    });
    // console.log(roleRecord);
    return record;
  }
}

export default new FeedbackFactory();
