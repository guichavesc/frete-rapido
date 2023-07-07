import { IQuoteRepository } from "../../dto/IQuoteRepository";
import { IQuoteService } from "../../dto/IQuoteService";
import { QuoteRepositoryInMemory } from "../../repository/infra/QuoteRepositoryInMemory";
import { QuoteService } from "../../services/QuoteService";
import { RetrieveQuoteUseCase } from "./RetrieveQuoteUseCase";

let retrieveQuoteUseCase: RetrieveQuoteUseCase;
let quoteService: IQuoteService;
let quoteRepository: IQuoteRepository;
describe("Retrieve quote use case", () => {
  beforeEach(() => {
    quoteService = new QuoteService();
    quoteRepository = new QuoteRepositoryInMemory();
    retrieveQuoteUseCase = new RetrieveQuoteUseCase(
      quoteService,
      quoteRepository
    );
  });

  it("Should be able to retrieve simmulations and give it ", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [
        {
          offers: [
            {
              carrier: {
                name: "Correios",
                registered_number: "123456789",
                state_inscription: "123456789",
                logo: "logo",
                reference: 1,
                company_name: "Correios",
              },
              service: "SEDEX",
              delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              expiration: "2021-08-25",
              cost_price: 10,
              final_price: 10,
              weights: {
                real: 10,
                cubed: 10,
                used: 10,
              },
              original_delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              correios: {
                service_code: "SEDEX",
                service_description: "SEDEX",
              },
            },
          ],
        },
      ],
    });

    const data = await retrieveQuoteUseCase.execute(
      {
        address: {
          zipcode: "29161376",
        },
      },
      [
        {
          amount: 1,
          height: 10,
          length: 10,
          price: 10,
          sku: "1",
          unitary_weight: 10,
          width: 10,
        },
      ]
    );

    expect(data).toHaveProperty("carrier");
  });

  it("Should not found any offers", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [
        {
          offers: [],
        },
      ],
    });

    quoteRepository.saveMany = jest.fn().mockReturnValue(true);

    expect(async () => {
      await retrieveQuoteUseCase.execute(
        {
          address: {
            zipcode: "29161376",
          },
        },
        [
          {
            amount: 1,
            height: 10,
            length: 10,
            price: 10,
            sku: "1",
            unitary_weight: 10,
            width: 10,
          },
        ]
      );
    }).rejects.toThrowError("");
  });

  it("Should thrown an error if the dispatcher is not found", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [],
    });

    quoteRepository.saveMany = jest.fn().mockReturnValue(true);

    expect(async () => {
      await retrieveQuoteUseCase.execute(
        {
          address: {
            zipcode: "29161376",
          },
        },
        [
          {
            amount: 1,
            height: 10,
            length: 10,
            price: 10,
            sku: "1",
            unitary_weight: 10,
            width: 10,
          },
        ]
      );
    }).rejects.toThrowError();
  });

  it("Should thrown an error if the offers is not found", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [
        {
          offers: [],
        },
      ],
    });

    expect(async () => {
      await retrieveQuoteUseCase.execute(
        {
          address: {
            zipcode: "29161376",
          },
        },
        [
          {
            amount: 1,
            height: 10,
            length: 10,
            price: 10,
            sku: "1",
            unitary_weight: 10,
            width: 10,
          },
        ]
      );
    }).rejects.toThrowError();
  });

  it("Should persist the quote when the quote is retrieved", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [
        {
          offers: [
            {
              carrier: {
                name: "Correios",
                registered_number: "123456789",
                state_inscription: "123456789",
                logo: "logo",
                reference: 1,
                company_name: "Correios",
              },
              service: "SEDEX",
              delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              expiration: "2021-08-25",
              cost_price: 10,
              final_price: 10,
              weights: {
                real: 10,
                cubed: 10,
                used: 10,
              },
              original_delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              correios: {
                service_code: "SEDEX",
                service_description: "SEDEX",
              },
            },
            {
              carrier: {
                name: "Correios",
                registered_number: "123456789",
                state_inscription: "123456789",
                logo: "logo",
                reference: 1,
                company_name: "Correios",
              },
              service: "SEDEX",
              delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              expiration: "2021-08-25",
              cost_price: 10,
              final_price: 10,
              weights: {
                real: 10,
                cubed: 10,
                used: 10,
              },
              original_delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              correios: {
                service_code: "SEDEX",
                service_description: "SEDEX",
              },
            },
          ],
        },
      ],
    });

    await retrieveQuoteUseCase.execute(
      {
        address: {
          zipcode: "29161376",
        },
      },
      [
        {
          amount: 1,
          height: 10,
          length: 10,
          price: 10,
          sku: "1",
          unitary_weight: 10,
          width: 10,
        },
      ]
    );

    const quote = await quoteRepository.list();

    expect(quote).toHaveLength(2);
  });

  it("Should call the quote service with the correct params", async () => {
    quoteService.calculate = jest.fn().mockReturnValue({
      dispatchers: [
        {
          offers: [
            {
              carrier: {
                name: "Correios",
                registered_number: "123456789",
                state_inscription: "123456789",
                logo: "logo",
                reference: 1,
                company_name: "Correios",
              },
              service: "SEDEX",
              delivery_time: {
                days: 1,
                estimated_date: "2021-08-25",
              },
              expiration: "2021-08-25",
              cost_price: 10,
              final_price: 10,
              weights: {
                real: 10,
                cubed: 10,
                used: 10,
              },
              original_delivery_time: {
                days: 1,

                estimated_date: "2021-08-25",
              },
              correios: {
                service_code: "SEDEX",
                service_description: "SEDEX",
              },
            },
          ],
        },
      ],
    });

    await retrieveQuoteUseCase.execute(
      {
        address: {
          zipcode: "29161376",
        },
      },
      [
        {
          amount: 1,
          height: 10,
          length: 10,
          price: 10,
          sku: "1",
          unitary_weight: 10,
          width: 10,
        },
      ]
    );

    expect(quoteService.calculate).toHaveBeenCalledWith({
      recipient: {
        address: {
          zipcode: "29161376",
        },
      },
      volumes: [
        {
          amount: 1,
          height: 10,
          length: 10,
          price: 10,
          sku: "1",
          unitary_weight: 10,
          width: 10,
        },
      ],
    });
  });
});
