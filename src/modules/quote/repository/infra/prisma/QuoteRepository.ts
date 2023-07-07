import { PrismaClient } from "@prisma/client";
import { IQuoteRepository } from "../../../dto/IQuoteRepository";

import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export class QuoteRepository implements IQuoteRepository {
  async save(quote: {
    id?: string;
    name: string;
    service: string;
    deadline: string;
    price: number;
  }) {
    await prisma.quote.create({
      data: {
        ...(quote.id && {
          id: uuid(),
        }),
        name: quote.name,
        service: quote.service,
        deadline: quote.deadline,
        price: quote.price,
      },
    });
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
    const data = await prisma.quote.findMany();

    const sanitizedData = data.map((quote) => {
      return {
        id: quote.id,
        name: quote.name,
        service: quote.service,
        deadline: quote.deadline,
        price: +quote.price,
      };
    });

    if (lastQuotes) {
      return sanitizedData.slice(-lastQuotes);
    }

    return sanitizedData;
  }
}
