import jwt from "jsonwebtoken";
import DS from "../../lib/DataSource.js";

export const authorizeAdmin = async (req, res, next) => {
  try {
    // get the payload data out of the token
    const { id } = req.user;

    // console.log(req.user)
    // get the user out of the database
    const userRepository = DS.getRepository("Reviewer");
    const user = await userRepository.findOne({ where: { id } });

    const userRole = user.isAdmin;
    if (userRole) {
      return next();
    }
    throw new Error("You are not authorized to view this page");
  } catch (e) {
    // console.log(e)
    return res.redirect("/");
  }
};
