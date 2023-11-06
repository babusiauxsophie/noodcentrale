import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Recording",
  tableName: "recordings",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    date: {
      type: "int",
    },
    soundpath: {
      type: "varchar",
    },
  },
  relations: {
    operator: {
      target: "Operator",
      type: "many-to-one",
      inverseSide: "recordings",
      joinColumn: {
        name: "operator_id",
      },
      onDelete: "CASCADE",
    },
    feedbacks: {
      target: "Feedback",
      type: "one-to-many",
      inverseSide: "recording",
      cascade: true,
    },
    categories: {
      target: "Category", // name of the entity
      type: "many-to-many", // type of relation
      joinTable: {
        name: "categories_recordings",
      },
      cascade: false,
    },
  },
});
