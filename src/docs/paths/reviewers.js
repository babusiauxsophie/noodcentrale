import reviewerResponse from "../responses/reviewers.js";

export default {
  "/reviewers": {
    summary: "CRUD for reviewers",
    description: "CRUD for reviewers",
    get: {
      tags: ["reviewers"],
      summary: "Get all reviewers",
      responses: reviewerResponse,
    },
    post: {
      tags: ["reviewers"],
      summary: "Create a new reviewer",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Reviewer",
            },
          },
        },
      },
      responses: reviewerResponse,
    },
    put: {
      tags: ["reviewers"],
      summary: "Update a reviewer",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Reviewer",
            },
          },
        },
      },
      responses: reviewerResponse,
    },
  },
  "/reviewers/{id}": {
    summary: "Get one reviewer with given id",
    description: "Get one reviewer with given id",
    get: {
      tags: ["reviewers"],
      summary: "Get one reviewer with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the reviewer to get",
        },
      ],
      responses: reviewerResponse,
    },
    delete: {
      tags: ["reviewers"],
      summary: "Deletes a reviewer with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the reviewer to delete",
        },
      ],
    },
  },
};
