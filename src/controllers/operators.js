import DataSource from "../lib/DataSource.js";
import data from "../data.js";

export const operators = async (req, res) => {
  data.nav.forEach((item) => {
    item.isActive = item.url === "/operatoren";
  });
  // repo is een object dat de CRUD operaties bevat
  const operatorRepo = DataSource.getRepository("Operator");

  // haal alle items op
  const operatorItems = await operatorRepo.find();
  // render the operators page
  res.render("operators", {
    user: req.user,
    data,
    operatorItems,
  });
};

export const operatorsCrud = async (req, res) => {
  data.admin.forEach((item) => {
    item.isActive = item.url === "/admin/operatoren";
  });
  // repo is een object dat de CRUD operaties bevat
  const operatorRepo = DataSource.getRepository("Operator");

  // haal alle items op
  const operatorItems = await operatorRepo.find();
  // render the operators page
  res.render("operators-crud", {
    layout: "admin",
    user: req.user,
    data,
    operatorItems,
  });
};
