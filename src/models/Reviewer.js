import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Reviewer",
  tableName: "reviewers",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    isAdmin: {
      type: "int",
    },
  },
  relations: {
    feedbacks: {
      target: "Feedback", // name of the entity
      type: "one-to-many",
      cascade: false,
      inverseSide: "reviewer",
    },
    role: {
      target: "Role",
      type: "many-to-one",
      inverseSide: "reviewers",
      joinColumn: {
        name: "role_id",
      },
    },
  },
});
