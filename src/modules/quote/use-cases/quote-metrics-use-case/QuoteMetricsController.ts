import { NextFunction, Request, Response } from "express";
import { HttpRequestError } from "../../../../shared/errors/HttpErrorHandler";
import { QuoteMetricsUseCase } from "./QuoteMetricsUseCase";

export class QuoteMetricsController {
  constructor(private readonly quoteMetricsUseCase: QuoteMetricsUseCase) {}
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { last_quotes } = request.query;

      // validate last_quotes
      if (last_quotes && isNaN(Number(last_quotes))) {
        throw new HttpRequestError(400, "last_quotes must be a number");
      }

      const data = await this.quoteMetricsUseCase.execute({
        lastQuotes: Number(last_quotes),
      });

      return response.json(data);
    } catch (error) {
      next(error);
    }
  }
}
