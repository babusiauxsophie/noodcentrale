import jwt from "jsonwebtoken";
import DS from "../lib/DataSource.js";

export const jwtAuth = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);

    // get the user out of the database
    const userRepository = DS.getRepository("Reviewer");
    const user = await userRepository.findOne({ where: { id } });

    // remove the password from the user object
    // so we don't send it to the client, ever, ever, ever
    user.password = "";

    req.user = user;

    // go to the next chain
    next();
  } catch (e) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};
