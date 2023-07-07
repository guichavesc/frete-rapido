import { IQuoteRepository } from "../../dto/IQuoteRepository";
import { QuoteRepositoryInMemory } from "../../repository/infra/QuoteRepositoryInMemory";
import { QuoteMetricsUseCase } from "./QuoteMetricsUseCase";

let quoteMetricsUseCase: QuoteMetricsUseCase;
let quoteRepository: IQuoteRepository;

const quotes = [
  {
    name: "Correios",
    deadline: "5",
    price: 5.5,
    service: "SEDEX",
  },
  {
    name: "Braspress",
    deadline: "5",
    price: 12.5,
    service: "Expresso",
  },
  {
    name: "Braspress",
    deadline: "5",
    price: 35,
    service: "Normal",
  },
  {
    name: "Jadlog",
    deadline: "5",
    price: 12.5,
    service: "Expresso",
  },
  {
    name: "Jadlog",
    deadline: "5",
    price: 3.5,
    service: "Normal",
  },
  {
    name: "Jadlog",
    deadline: "5",
    price: 32.5,
    service: "Normal 5 days",
  },
];
describe("Quote Metrics Use Case", () => {
  beforeEach(() => {
    quoteRepository = new QuoteRepositoryInMemory();
    quoteMetricsUseCase = new QuoteMetricsUseCase(quoteRepository);
  });

  it("Should return the metrics", async () => {
    await quoteRepository.saveMany(quotes);

    const data = await quoteMetricsUseCase.execute({
      lastQuotes: 10,
    });

    expect(data).toMatchObject({
      metrics: {
        totalQuotes: 6,
        totalQuotesPerCarrier: {
          Correios: 1,
          Braspress: 2,
          Jadlog: 3,
        },
        totalPricePerCarrier: {
          Correios: 5.5,
          Braspress: 47.5,
          Jadlog: 48.5,
        },
        priceAveragePerCarrier: {
          Correios: 5.5,
          Braspress: 20.63,
          Jadlog: 11.69,
        },
        cheapestPricePerCarrier: {
          name: "Jadlog",
          deadline: "5",
          price: 3.5,
          service: "Normal",
          // jest should ignore date
          createdAt: "2000-01-01T00:00:00.000Z",
        },
        expensivePricePerCarrier: {
          name: "Braspress",
          deadline: "5",
          price: 35,
          service: "Normal",
          createdAt: "2000-01-01T00:00:00.000Z",
        },
      },
    });
  });

  it("Should return the metrics with last 3 quotes", async () => {
    await quoteRepository.saveMany(quotes);

    const data = await quoteMetricsUseCase.execute({
      lastQuotes: 3,
    });

    expect(data).toMatchObject({
      metrics: {
        totalQuotes: 3,
        totalQuotesPerCarrier: {
          Jadlog: 3,
        },
        totalPricePerCarrier: {
          Jadlog: 48.5,
        },
        priceAveragePerCarrier: {
          Jadlog: 11.69,
        },
        cheapestPricePerCarrier: {
          name: "Jadlog",
          deadline: "5",
          price: 3.5,
          service: "Normal",
          // jest should ignore date
          createdAt: "2000-01-01T00:00:00.000Z",
        },
        expensivePricePerCarrier: {
          name: "Jadlog",
          deadline: "5",
          price: 32.5,
          service: "Normal 5 days",
          createdAt: "2000-01-01T00:00:00.000Z",
        },
      },
    });
  });

  it("Should return the metrics with last 1 quotes", async () => {
    await quoteRepository.saveMany(quotes);

    const data = await quoteMetricsUseCase.execute({
      lastQuotes: 1,
    });

    expect(data).toMatchObject({
      metrics: {
        totalQuotes: 1,
        totalQuotesPerCarrier: {
          Jadlog: 1,
        },
        totalPricePerCarrier: {
          Jadlog: 32.5,
        },
        priceAveragePerCarrier: {
          Jadlog: 32.5,
        },
        cheapestPricePerCarrier: {
          name: "Jadlog",
          deadline: "5",
          price: 32.5,
          service: "Normal 5 days",
          createdAt: "2000-01-01T00:00:00.000Z",
        },
        expensivePricePerCarrier: {
          name: "Jadlog",
          deadline: "5",
          price: 32.5,
          service: "Normal 5 days",
          createdAt: "2000-01-01T00:00:00.000Z",
        },
      },
    });
  });
});
