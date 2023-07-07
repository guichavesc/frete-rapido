import axios from "axios";
import {
  IQuoteService,
  TCalculateRequest,
  TCalculateResponse,
} from "../dto/IQuoteService";

export class QuoteService implements IQuoteService {
  async calculate(data: TCalculateRequest): Promise<TCalculateResponse> {
    const volumes = data.volumes.map((volume) => {
      return {
        amount: volume.amount,
        amount_volumes: 0,
        category: String(volume.category),
        sku: volume.sku,
        tag: "",
        description: "",
        height: volume.height,
        width: volume.width,
        length: volume.length,
        unitary_price: volume.price,
        unitary_weight: volume.unitary_weight,
        consolidate: false,
        overlaid: false,
        rotate: false,
      };
    });

    // get sum of unitary prices
    const sumUnitaryPrice = data.volumes.reduce((acc, volume) => {
      return acc + volume.price;
    }, 0);

    const request = {
      shipper: {
        registered_number: "25438296000158",
        token: "1d52a9b6b78cf07b08586152459a5c90",
        platform_code: "5AKVkHqCn",
      },
      recipient: {
        type: 0,
        registered_number: "09657326907",
        state_inscription: "PR",
        country: "BRA",
        zipcode: Number(data.recipient.address.zipcode),
      },
      dispatchers: [
        {
          registered_number: "25438296000158",
          zipcode: 29161376,
          total_price: sumUnitaryPrice,
          volumes: volumes,
        },
      ],
      channel: "",
      filter: 0,
      limit: 0,
      identification: "",
      reverse: false,
      simulation_type: [0],
      returns: {
        composition: false,
        volumes: false,
        applied_rules: false,
      },
    };

    const { data: calculateData } = await axios.post(
      "https://sp.freterapido.com/api/v3/quote/simulate",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return calculateData as TCalculateResponse;
  }
}
