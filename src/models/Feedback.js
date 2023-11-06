import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Feedback",
  tableName: "feedbacks",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    feedback: {
      type: "varchar",
    },
  },
  relations: {
    recording: {
      target: "Recording",
      type: "many-to-one",
      inverseSide: "feedbacks",
      joinColumn: {
        name: "recording_id",
      },
      onDelete: "CASCADE",
    },
    reviewer: {
      target: "Reviewer",
      type: "many-to-one",
      inverseSide: "feedbacks",
      joinColumn: {
        name: "reviewer_id",
      },
    },
    operator: {
      target: "Operator",
      type: "many-to-one",
      inverseSide: "feedback",
      joinColumn: {
        name: "operator_id",
      },
    },
  },
});
