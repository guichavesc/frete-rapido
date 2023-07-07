import { v4 as uuid } from "uuid";
import { IQuoteRepository } from "../../dto/IQuoteRepository";
export class QuoteRepositoryInMemory implements IQuoteRepository {
  private quotes = [];

  async save(quote: {
    id?: string;
    name: string;
    service: string;
    deadline: string;
    price: number;
  }) {
    const quoteData = {
      ...(quote.id && {
        id: uuid(),
      }),
      name: quote.name,
      service: quote.service,
      deadline: quote.deadline,
      price: quote.price,
      createdAt: "2000-01-01T00:00:00.000Z",
    };

    this.quotes.push(quoteData);
  }

  async saveMany(
    quotes: {
      id?: string;
      name: string;
      service: string;
      deadline: string;
      price: number;
    }[]
  ) {
    quotes.forEach(async (quote) => {
      await this.save(quote);
    });
  }

  async list(lastQuotes?: number) {
    if (lastQuotes) {
      return this.quotes.slice(-lastQuotes);
    }

    return this.quotes;
  }
}
