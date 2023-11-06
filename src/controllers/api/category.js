/**
 * The Category API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryRepository = DataSource.getRepository("Category");
    const category = await categoryRepository.findOneBy({
      id,
    });
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get category",
    });
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categoryRepository = DataSource.getRepository("Category");
    const categories = await categoryRepository.find({
      relations: ["roles"],
    });
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get categories",
    });
  }
};

export const postCategory = async (req, res, next) => {
  try {
    const categoryRepository = DataSource.getRepository("Category");

    const category = await categoryRepository.findOneBy({
      name: ["req.body.name"],
    });

    // if we have an category, return the existing one
    if (category) {
      res.status(200).json({
        status: "Category already exists in database",
      });
    } else {
      // if the category does not exist... create a new one in the database!
      await categoryRepository.save(req.body);

      // let the client know that we added an entry
      res.status(201).json({
        status: "We created a new category in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create category",
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoryRepository = DataSource.getRepository("Category");

    const category = await categoryRepository.findOneBy({
      id,
    });

    if (category) {
      // remove the category
      await categoryRepository.delete(category);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete the category",
    });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryRepository = DataSource.getRepository("Category");

    const category = await categoryRepository.findOneBy({
      id: req.body.id,
    });

    const newCategory = { ...category, ...req.body };

    await categoryRepository.save(newCategory);
    res.status(200).json(newCategory);
  } catch (e) {
    res.status(500).json({
      status: "Could not update category",
    });
  }
};
