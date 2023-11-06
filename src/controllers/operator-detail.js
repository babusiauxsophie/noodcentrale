import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const operatorDetail = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/operatoren";
  });

  const { id } = req.params;

  // repo is een object dat de CRUD operaties bevat
  const operatorRepo = DataSource.getRepository("Operator");
  const feedbackRepo = DataSource.getRepository("Feedback");

  // haal alle items op
  const operator = await operatorRepo.findOneBy({
    id,
  });

  const feedback = await feedbackRepo.find({
    relations: ["reviewer", "recording", "recording.categories"],
    where: {
      operator: {
        id,
      },
    },
  });
  for (let i = 0; i < feedback.length; i++) {
    feedback[i].feedback = JSON.parse(feedback[i].feedback);
  }

  // render the operators page
  res.render("operator-detail", {
    user: req.user,
    data,
    operator,
    feedback,
  });
};
