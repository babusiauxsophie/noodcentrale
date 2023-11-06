/**
 * The role API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const roleRepository = DataSource.getRepository("Role");
    const role = await roleRepository.findOneBy({
      id,
    });
    res.status(200).json(role);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get role",
    });
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const roleRepository = DataSource.getRepository("Role");
    const roles = await roleRepository.find({
      relations: ["categories"],
    });
    res.status(200).json(roles);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get roles",
    });
  }
};

export const postRole = async (req, res, next) => {
  try {
    const roleRepository = DataSource.getRepository("Role");
    const categoryRepository = DataSource.getRepository("Category");

    const role = await roleRepository.findOneBy({
      name: ["req.body.name"],
    });

    // if we have an role, return the existing one
    if (role) {
      res.status(200).json({
        status: "Role already exists in database",
      });
    } else {
      // if the role does not exist... create a new one in the database!
      await roleRepository.save({
        ...req.body,
      });

      // let the client know that we added an entry
      res.status(201).json({
        status: "We created a new role in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create role",
    });
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roleRepository = DataSource.getRepository("Role");

    const role = await roleRepository.findOneBy({
      id,
    });

    if (role) {
      // remove the role
      await roleRepository.delete(role);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete the role.",
    });
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const roleRepository = DataSource.getRepository("Role");

    const role = await roleRepository.findOneBy({
      id: req.body.id,
    });

    const newRole = { ...role, ...req.body };

    await roleRepository.save(newRole);
    res.status(200).json(newRole);
  } catch (e) {
    res.status(500).json({
      status: "Could not update role",
    });
  }
};
