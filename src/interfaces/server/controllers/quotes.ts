import express from "express";
import { quoteMetricsController } from "../../../modules/quote/use-cases/quote-metrics-use-case";
import { retrieveQuoteController } from "../../../modules/quote/use-cases/retrieve-quote-use-case";
const quoteRoutes = express.Router();
quoteRoutes.post("/", (req, res, next) =>
  retrieveQuoteController.handle(req, res, next)
);
quoteRoutes.get("/metrics", (req, res, next) =>
  quoteMetricsController.handle(req, res, next)
);

export { quoteRoutes };
