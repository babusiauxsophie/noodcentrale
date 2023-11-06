import typeorm, { JoinColumn } from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Operator",
  tableName: "operators",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    lastReviewed: {
      type: "int",
    },
  },
  relations: {
    recordings: {
      target: "Recording",
      type: "one-to-many",
      cascade: true,
      inverseSide: "operator",
    },
    feedback: {
      target: "Feedback",
      type: "one-to-many",
      inverseSide: "operator",
    },
  },
});
