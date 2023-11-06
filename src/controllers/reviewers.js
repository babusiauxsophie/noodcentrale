import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const reviewersCrud = async (req, res) => {
  data.admin.forEach((item) => {
    item.isActive = item.url === "/admin/reviewers";
  });
  // repo is een object dat de CRUD operaties bevat
  const reviewers = DataSource.getRepository("Reviewer");

  const reviewer = await reviewers.find({
    relations: ["role"],
    where: {
      isAdmin: 0,
    },
  });

  // render the opnames page
  res.render("reviewers-crud", {
    layout: "admin",
    user: req.user,
    data,
    reviewer,
  });
};
