import { NextFunction, Request, Response } from "express";
import { RetrieveQuoteUseCase } from "./RetrieveQuoteUseCase";
import { retrieveQuoteUseCaseSchema } from "./retrieveQuoteUseCase.schema";

export class RetrieveQuoteController {
  constructor(private retrieveQuoteUseCase: RetrieveQuoteUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { recipient, volumes } = request.body;

      await retrieveQuoteUseCaseSchema.validateAsync(
        {
          recipient,
          volumes,
        },
        {
          abortEarly: false,
        }
      );

      const { carrier } = await this.retrieveQuoteUseCase.execute(
        recipient,
        volumes
      );
      return response.json({
        carrier,
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
}
