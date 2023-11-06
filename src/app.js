import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import DataSource from "./lib/DataSource.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import express from "express";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./const.js";
import path from "path";
import {
  home,
  admin,
  operators,
  operatorsCrud,
  operatorDetail,
  opnames,
  opnameReview,
  opnameReviewComplete,
  reviewersCrud,
  categoriesCrud,
} from "./controllers/index.js";
import {
  login,
  register,
  logout,
  postLogin,
  postRegister,
} from "./controllers/authentication.js";
// import middleware
import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";
import { authorizeAdmin } from "./controllers/authorization/authorize.js";
import { jwtAuth } from "./middleware/jwtAuth.js";
import {
  getOperator,
  deleteOperator,
  getOperators,
  postOperator,
  updateOperator,
} from "./controllers/api/operator.js";
import {
  getFeedback,
  getFeedbacks,
  postFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbackByReviewerId,
} from "./controllers/api/feedback.js";
import { getRecordings, getRecording } from "./controllers/api/recording.js";
import {
  getCategory,
  deleteCategory,
  getCategories,
  postCategory,
  updateCategory,
} from "./controllers/api/category.js";
import {
  getRole,
  getRoles,
  postRole,
  deleteRole,
  updateRole,
} from "./controllers/api/role.js";
import {
  getReviewer,
  getReviewers,
  postReviewer,
  deleteReviewer,
  updateReviewer,
} from "./controllers/api/reviewer.js";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "./docs/swagger.js";

// const express = require('express');
// app.use(express.static("public"));
const app = express();
app.use(express.static("public"));

// adding swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// init cookieParser
app.use(cookieParser());

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});

// init bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

// Authentication
app.post("/register", registerAuthentication, postRegister, register);
app.post("/login", loginAuthentication, postLogin, login);

// routes
app.get("/", jwtAuth, home);
app.get("/register", register);
app.get("/login", login);
app.get("/logout", logout);
app.get("/operatoren", jwtAuth, operators);
app.get("/operatoren/:id", jwtAuth, operatorDetail);
app.get("/opnames", jwtAuth, opnames);
app.get("/opnames/opname-review-detail/:id", jwtAuth, opnameReviewComplete);
app.get("/opnames/opname-review/:id", jwtAuth, opnameReview);
app.get("/admin", jwtAuth, authorizeAdmin, admin);
app.get("/admin/operatoren", jwtAuth, authorizeAdmin, operatorsCrud);
app.get("/admin/reviewers", jwtAuth, authorizeAdmin, reviewersCrud);
app.get("/admin/categorieen", jwtAuth, authorizeAdmin, categoriesCrud);

app.get("/api/operators", getOperators);
app.get("/api/operators/:id", getOperator);
app.post("/api/operators", postOperator);
app.delete("/api/operators/:id", deleteOperator);
app.put("/api/operators", updateOperator);

app.get("/api/recordings", getRecordings);
app.get("/api/recordings/:id", getRecording);

app.get("/api/feedback/:id", getFeedback);
app.get("/api/feedbacks", getFeedbacks);
app.get("/api/feedbacksByReviewerId", getFeedbackByReviewerId);
app.post("/api/feedbacks/:recordingId", jwtAuth, postFeedback);
app.delete("/api/feedbacks/:id", deleteFeedback);
app.put("/api/feedbacks", updateFeedback);

app.get("/api/categorie/:id", getCategory);
app.get("/api/categories", getCategories);
app.post("/api/categories", postCategory);
app.delete("/api/categories/:id", deleteCategory);
app.put("/api/categories", updateCategory);

app.get("/api/roles/:id", getRole);
app.get("/api/roles", getRoles);
app.post("/api/roles", postRole);
app.delete("/api/roles/:id", deleteRole);
app.put("/api/roles", updateRole);

app.get("/api/reviewers/:id", getReviewer);
app.get("/api/reviewers", getReviewers);
app.post("/api/reviewers", postReviewer);
app.delete("/api/reviewers/:id", deleteReviewer);
app.put("/api/reviewers", updateReviewer);

DataSource.initialize()
  .then(() => {
    // start the server
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
