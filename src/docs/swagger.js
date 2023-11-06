import schemas from "./schemas.js";
import paths from "./paths/index.js";

export default {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Swagger Demo App API",
    description: "This is an API to call HTTP methods and alter data",
    license: {
      name: "Arteveldehogeschool",
      url: "https://arteveldehogeschool.be",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "This is the development server",
    },
  ],
  tags: [],
  paths,
  components: {
    schemas,
  },
};
