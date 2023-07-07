export type TQuote = {
  id: number;
  name: string;
  service: string;
  deadline: string;
  price: number;
};

export interface IQuoteRepository {
  create(quote: TQuote): Promise<TQuote>;
  findById(id: number): Promise<TQuote | null>;
}
