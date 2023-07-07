export interface IQuoteRepository {
  save: (quote: {
    name: string;
    id?: string;
    service: string;
    deadline: string;
    price: number;
  }) => Promise<void>;

  saveMany(
    quotes: {
      id?: string;
      name: string;
      service: string;
      deadline: string;
      price: number;
    }[]
  ): Promise<void>;

  list(lastQuotes?: number): Promise<
    {
      id: string;
      name: string;
      service: string;
      deadline: string;
      price: number;
    }[]
  >;
}
