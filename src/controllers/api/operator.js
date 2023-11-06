/**
 * The Operator API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getOperator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const operatorRepository = DataSource.getRepository("Operator");
    const operator = await operatorRepository.findOneBy({
      id,
    });
    res.status(200).json(operator);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get operator",
    });
  }
};

export const getOperators = async (req, res, next) => {
  try {
    const operatorRepository = DataSource.getRepository("Operator");
    const operators = await operatorRepository.find({
      relations: ["recordings"],
    });
    res.status(200).json(operators);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get operators",
    });
  }
};

export const postOperator = async (req, res, next) => {
  try {
    const operatorRepository = DataSource.getRepository("Operator");

    const data = req.body;

    const operator = await operatorRepository.findOneBy({
      email: data.email,
    });
    // if we have an operator, return the existing one
    if (operator) {
      res.status(200).json({
        status: "Operator already exists in database",
      });
    } else {
      // if the operator does not exist... create a new one in the database!
      await operatorRepository.save({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        lastReviewed: Date.now(),
      });

      // let the client know that we added an entry
      res.status(201).json({
        status: "We created a new operator in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create operator",
    });
  }
};

export const deleteOperator = async (req, res, next) => {
  try {
    const { id } = req.params;

    const operatorRepository = DataSource.getRepository("Operator");

    const operator = await operatorRepository.findOneBy({
      id,
    });

    if (operator) {
      // remove the operator
      await operatorRepository.delete(operator);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete the operator",
    });
  }
};

export const updateOperator = async (req, res, next) => {
  try {
    const operatorRepository = DataSource.getRepository("Operator");

    const operator = await operatorRepository.findOneBy({
      id: req.body.id,
    });

    if (operator) {
      const newOperator = { ...operator, ...req.body };

      await operatorRepository.save(newOperator);
      res.status(200).json(newOperator);
    } else {
      res.status(404).json({
        status: "Operator with that id not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Could not update operator",
    });
  }
};
