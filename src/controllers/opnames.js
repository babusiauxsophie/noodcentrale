import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const opnames = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/opnames";
  });
  // repo is een object dat de CRUD operaties bevat
  const recordingRepo = DataSource.getRepository("Recording");
  const reviewers = DataSource.getRepository("Reviewer");

  // haal alle items op
  const reviewer = await reviewers.findOne({
    where: {
      id: req.user.id,
    },
    relations: ["role"],
  });
  const recordingItems = await recordingRepo.find({
    relations: ["operator", "categories", "feedbacks", "categories.roles"],
    where: {
      categories: {
        roles: {
          id: reviewer.role.id,
        },
      },
    },
  });
  // render the opnames page
  res.render("opnames", {
    user: req.user,
    data,
    recordingItems,
  });
};
