import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const admin = async (req, res) => {
  // add active state to nav
  data.admin.forEach((item) => {
    item.isActive = item.url === "/admin";
  });
  // repo is een object dat de CRUD operaties bevat
  const categoryRepo = DataSource.getRepository("Category");
  const feedbackRepo = DataSource.getRepository("Feedback");
  const operatorRepo = DataSource.getRepository("Operator");
  const recordingRepo = DataSource.getRepository("Recording");
  const reviewerRepo = DataSource.getRepository("Reviewer");
  const roleRepo = DataSource.getRepository("Role");

  // haal alle items op
  const categoryItems = await categoryRepo.find();
  const feedbackItems = await feedbackRepo.find();
  const operatorItems = await operatorRepo.find();
  const recordingItems = await recordingRepo.find();
  const reviewerItems = await reviewerRepo.find();
  const roleItems = await roleRepo.find();
  // render the home page
  res.render("admin", {
    layout: "admin",
    user: req.user,
    data,
    categoryItems,
    feedbackItems,
    operatorItems,
    recordingItems,
    reviewerItems,
    roleItems,
  });
};
