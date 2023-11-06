import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const opnameReviewComplete = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/opnames";
  });

  const { id } = req.params;

  const feedbackRepository = DataSource.getRepository("Feedback");
  const feedback = await feedbackRepository.find({
    where: {
      recording: {
        id: id,
      },
    },
    relations: ["reviewer", "recording"],
  });

  for (let i = 0; i < feedback.length; i++) {
    feedback[i].feedback = JSON.parse(feedback[i].feedback);
    feedback[i].reviewer.password = "";
  }
  // render the opnameReview page
  res.render("opname-review-complete", {
    user: req.user,
    data,
    feedback,
  });
};

export const opnameReview = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/opnames";
  });

  const { id } = req.params;
  const recordingRepository = DataSource.getRepository("Recording");
  const recording = await recordingRepository.findOne({
    where: { id },
    relations: ["operator", "categories", "feedbacks"],
  });
  // render the opnameReview page
  res.render("opname-review", {
    user: req.user,
    data,
    recording,
  });
};
