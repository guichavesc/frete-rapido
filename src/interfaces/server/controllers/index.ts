import { Router } from "express";
import { quoteRoutes } from "./quotes";

const routes = Router();

routes.use("/quote", quoteRoutes);

export { routes };
