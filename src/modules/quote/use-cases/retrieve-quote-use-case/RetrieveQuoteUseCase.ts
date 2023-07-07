import { v4 as uuid } from "uuid";
import { IQuoteRepository } from "../../dto/IQuoteRepository";
import { IQuoteService } from "../../dto/IQuoteService";
export type TRetrieveQuoteRequest = {
  carrier: Carrier[];
};
export interface Carrier {
  name: string;
  service: string;
  deadline: any;
  price: number;
}

export class RetrieveQuoteUseCase {
  constructor(
    private quoteService: IQuoteService,
    private quoteRepository: IQuoteRepository
  ) {}
  async execute(recipient, volumes): Promise<TRetrieveQuoteRequest> {
    const calculates = await this.quoteService.calculate({
      recipient,
      volumes,
    });

    if (
      !calculates?.dispatchers.length ||
      !calculates?.dispatchers[0]?.offers.length
    ) {
      throw new Error("No offers found");
    }

    const offers = calculates?.dispatchers[0]?.offers.map((offer) => {
      return {
        id: uuid(),
        name: offer.carrier.name,
        service: offer.service,
        deadline: String(offer.delivery_time.days),
        price: offer.final_price,
      };
    });

    await this.quoteRepository.saveMany(offers);

    return {
      carrier: offers,
    };
  }
}
