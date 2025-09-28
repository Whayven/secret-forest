import { strapi } from "@strapi/client";

const client = strapi({
  baseURL: process.env.API_URL || "http://localhost:1337/api",
  auth: process.env.API_TOKEN,
});

export default client;
