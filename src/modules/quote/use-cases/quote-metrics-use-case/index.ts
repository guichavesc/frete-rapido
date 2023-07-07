import { QuoteRepository } from "../../repository/infra/prisma/QuoteRepository";
import { QuoteMetricsController } from "./QuoteMetricsController";
import { QuoteMetricsUseCase } from "./QuoteMetricsUseCase";

const quoteRepository = new QuoteRepository();
const quoteMetricsUseCase = new QuoteMetricsUseCase(quoteRepository);
const quoteMetricsController = new QuoteMetricsController(quoteMetricsUseCase);

export { quoteMetricsController };
