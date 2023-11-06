export default {
  Reviewer: {
    properties: {
      id: { type: "number" },
      email: { type: "string" },
      password: { type: "string" },
      firstname: { type: "string" },
      lastname: { type: "string" },
      isAdmin: { type: "number" },
      roles: {
        $ref: "#/components/schemas/Role",
      },
    },
    example: {
      id: 1,
      email: "JohnDoe@mail.com",
      password: "Azrty123",
      firstname: "John",
      lastname: "Doe",
      isAdmin: 0,
      roles: {
        id: 1,
      },
    },
  },
  Role: {
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      reviewers: {
        $ref: "#/components/schemas/Reviewer",
      },
      categories: {
        $ref: "#/components/schemas/Category",
      },
    },
  },
  Category: {
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      recordings: {
        $ref: "#/components/schemas/Recording",
      },
      roles: {
        $ref: "#/components/schemas/Role",
      },
    },
    example: {
      id: 1,
      name: "politie",
      roles: [
        {
          id: 1,
          name: "niet-medisch",
        },
      ],
    },
  },
  Feedback: {
    properties: {
      id: { type: "number" },
      feedback: { type: "string" },
      recordings: {
        $ref: "#/components/schemas/Recording",
      },
      reviewer: {
        $ref: "#/components/schemas/Reviewer",
      },
    },
  },
  Operator: {
    properties: {
      id: { type: "number" },
      firstname: { type: "string" },
      lastname: { type: "string" },
      email: { type: "string" },
      lastReviewed: { type: "number" },
      recordings: {
        $ref: "#/components/schemas/Recording",
      },
    },
    example: {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "John.Doe@noodcentrale.be",
      lastReviewed: 1670000000000,
      recordings: [
        {
          id: 1,
          date: 1670000000000,
          soundpath: "example.mp4",
        },
        {
          id: 2,
          date: 1670000000000,
          soundpath: "example2.mp4",
        },
      ],
    },
  },
  Recording: {
    properties: {
      id: { type: "number" },
      date: { type: "number" },
      soundpath: { type: "string" },
      operators: {
        $ref: "#/components/schemas/Operator",
      },
      categories: {
        $ref: "#/components/schemas/Category",
      },
      feedbacks: {
        $ref: "#/components/schemas/Feedback",
      },
    },
  },
};
