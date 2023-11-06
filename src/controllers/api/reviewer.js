/**
 * The Reviewer API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getReviewer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewerRepository = DataSource.getRepository("Reviewer");
    const reviewer = await reviewerRepository.findOneBy({
      id,
    });
    res.status(200).json(reviewer);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get reviewer",
    });
  }
};

export const getReviewers = async (req, res, next) => {
  try {
    const reviewerRepository = DataSource.getRepository("Reviewer");
    const reviewers = await reviewerRepository.find();
    res.status(200).json(reviewers);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get reviewers",
    });
  }
};

export const postReviewer = async (req, res, next) => {
  try {
    const reviewerRepository = DataSource.getRepository("Reviewer");

    const reviewer = await reviewerRepository.findOneBy({
      email: req.body.email,
    });

    // if we have a reviewer, return the existing one
    if (reviewer) {
      res.status(200).json({
        status: "reviewer already exists in database",
      });
    } else {
      // if the reviewer does not exist... create a new one in the database!
      await reviewerRepository.save(req.body);

      // let the client know that we added an entry
      res.status(201).json({
        status: "We created a new reviewer in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create reviewer",
    });
  }
};

export const deleteReviewer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviewerRepository = DataSource.getRepository("Reviewer");

    const reviewer = await reviewerRepository.findOneBy({
      id,
    });

    if (reviewer) {
      // remove the reviewer
      await reviewerRepository.delete(reviewer);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete reviewer",
    });
  }
};

export const updateReviewer = async (req, res, next) => {
  try {
    const reviewerRepository = DataSource.getRepository("Reviewer");

    const reviewer = await reviewerRepository.findOneBy({
      id: req.body.id,
    });

    const newReviewer = { ...reviewer, ...req.body };

    if (reviewer) {
      await reviewerRepository.save(newReviewer);
      res.status(200).json(newReviewer);
    } else {
      res.status(404).json({
        status: "Reviewer with that id not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Could not update reviewer",
    });
  }
};
