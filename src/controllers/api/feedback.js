/**
 * The Feedback API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedbackRepository = DataSource.getRepository("Feedback");
    const feedback = await feedbackRepository.findOneBy({
      id,
    });
    res.status(200).json(feedback);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get feedback",
    });
  }
};

export const getFeedbackByReviewerId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const feedbackRepository = DataSource.getRepository("Feedback");
    const feedbacks = await feedbackRepository.find({
      relations: ["recording", "reviewer"],
      where: {
        reviewer: {
          id,
        },
      },
    });
    res.status(200).json(feedbacks);
  } catch (e) {
    // console.log(e);
    res.status(500).json({
      status: "Failed to get feedback",
    });
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbackRepository = DataSource.getRepository("Feedback");
    const feedbacks = await feedbackRepository.find({
      relations: ["recording", "reviewer"],
    });
    res.status(200).json(feedbacks);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get feedbacks",
    });
  }
};

export const postFeedback = async (req, res, next) => {
  try {
    const feedbackRepository = DataSource.getRepository("Feedback");
    const feedback = JSON.stringify(req.body);

    const recordings = DataSource.getRepository("Recording");
    const recording = await recordings.findOneBy({
      id: req.params.recordingId,
    });

    const operators = DataSource.getRepository("Operator");
    const operator = await operators.findOneBy({
      id: recording.operator_id,
    });
    // if the feedback does not exist... create a new one in the database!
    await feedbackRepository.save({
      feedback: feedback,
      recording: {
        id: req.params.recordingId,
      },
      reviewer: {
        id: req.user.id,
      },
    });

    await operators.save({
      id: operator.id,
      lastReviewed: Date.now(),
    });

    // let the client know that we added an entry
    res.redirect(201, "/opnames");
  } catch (e) {
    res.status(500).json({
      status: "Failed to create feedback",
    });
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedbackRepository = DataSource.getRepository("Feedback");

    const feedback = await feedbackRepository.findOneBy({
      id,
    });

    if (feedback) {
      // remove the feedback
      await feedbackRepository.delete(feedback);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete the feedback",
    });
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const feedbackRepository = DataSource.getRepository("Feedback");

    const feedback = await feedbackRepository.findOneBy({
      id: req.body.id,
    });

    if (feedback) {
      const jsonFeedback = JSON.stringify(req.body.feedback);

      const newFeedback = { id: req.body.id, feedback: jsonFeedback };

      await feedbackRepository.save(newFeedback);
      res.status(200).json(newFeedback);
    } else {
      res.status(404).json({
        status: "Feedback not found with that id",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Could not update feedback",
    });
  }
};
