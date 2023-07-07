import { IQuoteRepository } from "../../dto/IQuoteRepository";

export class QuoteMetricsUseCase {
  constructor(private readonly quoteRepository: IQuoteRepository) {}
  async execute({ lastQuotes }) {
    const quotes = await this.quoteRepository.list(lastQuotes);

    const totalQuotesPerCarrier = quotes.reduce((acc, quote) => {
      if (!acc[quote.name]) {
        acc[quote.name] = 0;
      }

      acc[quote.name] += 1;

      return acc;
    }, {});

    const priceAveragePerCarrier = quotes.reduce((acc, quote) => {
      if (!acc[quote.name]) {
        acc[quote.name] = 0;
      }

      acc[quote.name] = +(
        (quote.price + acc[quote.name]) /
        totalQuotesPerCarrier[quote.name]
      ).toFixed(2);

      return acc;
    }, {});

    const totalPricePerCarrier = quotes.reduce((acc, quote) => {
      if (!acc[quote.name]) {
        acc[quote.name] = 0;
      }

      acc[quote.name] = +(quote.price + acc[quote.name]).toFixed(2);

      return acc;
    }, {});

    const cheapestPricePerCarrier =
      quotes?.length > 0
        ? quotes.reduce(function (res, obj) {
            return obj.price < res.price ? obj : res;
          })
        : null;

    const expensivePricePerCarrier =
      quotes?.length > 0
        ? quotes.reduce(function (res, obj) {
            return obj.price > res.price ? obj : res;
          })
        : null;

    return {
      metrics: {
        totalQuotes: quotes.length,
        totalQuotesPerCarrier,
        totalPricePerCarrier,
        priceAveragePerCarrier,
        cheapestPricePerCarrier,
        expensivePricePerCarrier,
      },
    };
  }
}
