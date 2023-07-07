import cors from "cors";
import express from "express";
import { routes } from "../controllers";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandler);

// encapsulate the express app in a function

export default function createApp(): express.Application {
  return app;
}
