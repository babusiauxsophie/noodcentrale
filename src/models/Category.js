import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Category",
  tableName: "categories",
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
    recordings: {
      target: "Recording", // name of the entity
      type: "many-to-many", // type of relation
      joinTable: {
        name: "categories_recordings",
      },
    },
    roles: {
      target: "Role", // name of the entity
      type: "many-to-many", // type of relation
      joinTable: {
        name: "roles_categories",
      },
    },
  },
});
