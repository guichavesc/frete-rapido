import { QuoteRepository } from "../../repository/infra/prisma/QuoteRepository";
import { QuoteService } from "../../services/QuoteService";
import { RetrieveQuoteController } from "./RetrieveQuoteController";
import { RetrieveQuoteUseCase } from "./RetrieveQuoteUseCase";

const quoteService = new QuoteService();
const quoteRepository = new QuoteRepository();
const retrieveQuoteUseCase = new RetrieveQuoteUseCase(
  quoteService,
  quoteRepository
);
const retrieveQuoteController = new RetrieveQuoteController(
  retrieveQuoteUseCase
);

export { retrieveQuoteController };
