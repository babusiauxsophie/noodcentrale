import DataSource from "../lib/DataSource.js";
import data from "../data.js";

// export const categories = async (req, res) => {
//   data.nav.forEach(item => {
//     item.isActive = (item.url === '/categorieen');
//   });
//   // repo is een object dat de CRUD operaties bevat
//   const categoryRepo = DataSource.getRepository("Category");

//   // haal alle items op
//   const categoryItems = await categoryRepo.find();
//   // render the categories page
//   res.render("categories", {
//     user: req.user,
//     data,
//     categoryItems,
//   });
// };

export const categoriesCrud = async (req, res) => {
  data.admin.forEach((item) => {
    item.isActive = item.url === "/admin/categorieen";
  });
  // repo is een object dat de CRUD operaties bevat
  const categoryRepo = DataSource.getRepository("Category");

  // haal alle items op
  const categoryItems = await categoryRepo.find();
  // render the categories page
  res.render("category-crud", {
    layout: "admin",
    user: req.user,
    data,
    categoryItems,
  });
};
