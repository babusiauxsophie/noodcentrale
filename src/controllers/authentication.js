/*
 * Authentication Controller
 */

// import datasource to extract data from
import DS from "../lib/DataSource.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Authentication endpoints
export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        // console.log(error);
        errorFields[error.path] = error.msg;
      });
      // put the errorFields in the current request
      req.formErrorFields = errorFields;
      // console.log(errorFields);
      // console.log(req.formErrorFields);
      return next();
    } else {
      // make user repository instance
      const userRepo = DS.getRepository("Reviewer");

      const lwEmail = req.body.email.toLowerCase();

      const user = await userRepo.findOne({
        where: {
          email: lwEmail,
        },
      });

      if (!user) {
        req.formErrors = [{ message: "Gebruiker bestaat niet." }];
        return next();
      }

      // compare hashed password with saved hashed password
      const givenPassword = req.body.password;
      const dbPassword = user.password;
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword);

      //password check
      if (!isAMatch) {
        req.formErrors = [{ message: "Wachtwoord is niet correct." }];
        return next();
      }

      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email },
        process.env.TOKEN_SALT,
        { expiresIn: "24h" }
      );

      // create a cookie and add this to the response
      res.cookie("token", token, { httpOnly: true });

      //redirect to our root
      if (user.isAdmin) {
        res.redirect("admin");
      }
      res.redirect("/");
    }
  } catch (error) {
    next(error.message);
  }
};

export const postRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.path] = error.msg;
      });
      // put the errorFields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // make user repository instance
      const userRepo = await DS.getRepository("Reviewer");

      const userExists = await userRepo.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al." }];
        return next();
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      // create a new user
      const user = await userRepo.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
        role_id: 0,
      });

      // save the user
      await userRepo.save(user);

      res.redirect("/login");
    }
  } catch (error) {
    next(error.message);
  }
};

export const register = async (req, res, next) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "firstname",
      label: "Firstname",
      type: "text",
      value: req.body?.firstname ? req.body.firstname : "",
      error: req.formErrorFields?.firstname
        ? req.formErrorFields.firstname
        : null,
    },
    {
      name: "lastname",
      label: "Lastname",
      type: "text",
      value: req.body?.lastname ? req.body.lastname : "",
      error: req.formErrorFields?.lastname
        ? req.formErrorFields.lastname
        : null,
    },
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
    {
      name: "isAdmin",
      label: "IsAdmin",
      type: "text",
      value: req.body?.isAdmin ? req.body.isAdmin : "",
      error: req.formErrorFields?.isAdmin ? req.formErrorFields.isAdmin : null,
    },
  ];

  // render register page
  res.render("register", {
    layout: "authentication",
    formErrors,
    inputs,
  });
};

export const login = async (req, res, next) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render login page
  res.render("login", {
    layout: "authentication",
    formErrors,
    inputs,
  });
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
};
