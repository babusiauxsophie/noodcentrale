import operatorResponse from "../responses/operators.js";

export default {
  "/operators": {
    summary: "CRUD for operators",
    description: "CRUD for operators",
    get: {
      tags: ["operators"],
      summary: "Get all operators",
      response: operatorResponse,
    },
    post: {
      tags: ["operators"],
      summary: "Create a new operator",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Operator",
            },
          },
        },
      },
      responses: operatorResponse,
    },
    put: {
      tags: ["operators"],
      summary: "Update a operator",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Operator",
            },
          },
        },
      },
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the operator to get",
        },
        {
          in: "path",
          name: "firstname",
          required: true,
          schema: {
            type: "string",
          },
          description: "name of the operator to change",
        },
      ],
      responses: operatorResponse,
    },
  },
  "/operators/{id}": {
    summary: "Get one operator with given id",
    description: "Get one operator with given id",
    get: {
      tags: ["operators"],
      summary: "Get one operator with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the operator to get",
        },
      ],
      responses: operatorResponse,
    },
    delete: {
      tags: ["operators"],
      summary: "Deletes a operator with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the operator to delete",
        },
      ],
    },
  },
};
