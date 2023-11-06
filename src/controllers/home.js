import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const home = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/";
  });
  // repo is een object dat de CRUD operaties bevat
  const categoryRepo = DataSource.getRepository("Category");
  const feedbackRepo = DataSource.getRepository("Feedback");
  const operatorRepo = DataSource.getRepository("Operator");
  const recordingRepo = DataSource.getRepository("Recording");
  const roleRepo = DataSource.getRepository("Role");

  // haal alle items op
  const categoryItems = await categoryRepo.find();
  const feedbacksByReviewerId = await feedbackRepo.find({
    relations: [
      "recording",
      "reviewer",
      "recording.operator",
      "recording.categories",
    ],
    where: {
      reviewer: {
        id: req.user.id,
      },
    },
  });
  const operatorItems = await operatorRepo.find();
  const recordingItems = await recordingRepo.find({
    relations: ["operator"],
  });
  const roleItems = await roleRepo.find();
  // render the home page
  res.render("home", {
    user: req.user,
    data,
    categoryItems,
    feedbacksByReviewerId,
    operatorItems,
    recordingItems,
    roleItems,
  });
};
