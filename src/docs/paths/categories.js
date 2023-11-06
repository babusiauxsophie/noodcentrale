import categorieResponse from "../responses/categories.js";

export default {
  "/categories": {
    summary: "CRUD for categories",
    description: "CRUD for categories",
    get: {
      tags: ["categories"],
      summary: "Get all categories",
      responses: categorieResponse,
    },
    post: {
      tags: ["categories"],
      summary: "Create a new categorie",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      responses: categorieResponse,
    },
    put: {
      tags: ["categories"],
      summary: "Update a categorie",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      responses: categorieResponse,
    },
  },
  "/categories/{id}": {
    summary: "Get one categorie with given id",
    description: "Get one categorie with given id",
    get: {
      tags: ["categories"],
      summary: "Get one categorie with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the categorie to get",
        },
      ],
      responses: categorieResponse,
    },
    delete: {
      tags: ["categories"],
      summary: "Deletes a categorie with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the categorie to delete",
        },
      ],
    },
  },
};
