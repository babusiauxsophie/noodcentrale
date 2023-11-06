import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class Category_RecordingFactory extends Factory {
  constructor() {
    // roep de constructor van de parent class aan
    super();
  }

  // generate one category
  async make() {
    const recRepo = DataSource.getRepository("Recording");
    const catRepo = DataSource.getRepository("Category");
    // const catCount = await catRepo.count();
    const categories = await catRepo.find();
    const catIds = [];
    categories.forEach((category) => {
      catIds.push(category.id);
    });
    // console.log(catIds);
    // console.log("catCount: ", await catRepo.count());
    const recordings = await recRepo.find({
      relations: ["categories", "feedbacks"],
    });
    //   console.log(recordings);
    //for every recording, generate a random amount of categories between 1 and 3, and link them to the recording
    recordings.forEach((recording) => {
      const randomCatAmount = Math.floor(Math.random() * 3) + 1;
      // console.log(randomCatAmount," catAmount");
      // for(let i = 0; i < randomCatAmount; i++){

      const randomCatId = catIds[Math.floor(Math.random() * catIds.length)];
      // console.log("recId: ", recording.id,"catAmount: ",randomCatAmount, " catId: ",randomCatId,);
      console.log("catAmount: ", randomCatAmount);

      const record = this.insert(recording.id, randomCatId);
      this.inserted.push(record);
      // }
    });
  }

  // insert in the database
  async insert(recordingsId, categoriesId) {
    const category_recordingRepo = DataSource.getRepository(
      "categories_recordings"
    );
    // console.log(await category_recordingRepo.count());
    console.log("recId: ", recordingsId, " catId: ", categoriesId);
    // check if record exists
    let record = await category_recordingRepo.findOne({
      where: {
        recordingsId: recordingsId,
        categoriesId: categoriesId,
      },
    });
    if (record) return record;

    // it doesn't exist, so create it
    record = await category_recordingRepo.insert({
      recordingsId,
      categoriesId,
    });

    // return the record
    return record;
  }
}

export default new Category_RecordingFactory();
