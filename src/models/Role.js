import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Role",
  tableName: "roles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    reviewers: {
      target: "Reviewer", // name of the entity
      type: "one-to-many",
      cascade: false,
      inverseSide: "role",
    },
    categories: {
      target: "Category", // name of the entity
      type: "many-to-many", // type of relation
      joinTable: {
        name: "roles_categories",
      },
      cascade: false,
    },
  },
});
