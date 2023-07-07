import axios from "axios";
import { Decimal } from "decimal.js";

import request from "supertest";
import { Context, MockContext, createMockContext } from "../context";
import { prismaMock } from "../singleton";
import { app } from "../src/interfaces/server/index";
import { QuoteService } from "../src/modules/quote/services/QuoteService";
jest.mock("axios");

let quoteService: QuoteService;
let mockCtx: MockContext;
let ctx: Context;
describe("[e2e] - App tests", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    quoteService = new QuoteService();
  });
  it("Should return an error if the zipcode is not on the valid format", async () => {
    const response = await request(app)
      .post("/quote")
      .send({
        recipient: {
          address: {
            zipcode: "",
          },
        },
        volumes: [
          {
            category: 7,
            amount: 1,
            unitary_weight: 5,
            price: 349,
            sku: "abc-teste-123",
            height: 0.2,
            width: 0.2,
            length: 0.2,
          },
          {
            category: 7,
            amount: 2,
            unitary_weight: 4,
            price: 556,
            sku: "abc-teste-527",
            height: 0.4,
            width: 0.6,
            length: 0.15,
          },
        ],
      });

    expect(response.status).toBe(400);

    expect(response.text).toBe(
      '{"message":"\\"recipient.address.zipcode\\" is not allowed to be empty"}'
    );
  });

  it("Should return an error if the volumes is not on the valid format", async () => {
    const response = await request(app)
      .post("/quote")
      .send({
        recipient: {
          address: {
            zipcode: "12345678",
          },
        },
        volumes: {
          category: 7,
          amount: 1,
          unitary_weight: 5,
          price: 349,
          sku: "abc-teste-123",
          height: 0.2,
          width: 0.2,
          length: 0.2,
        },
      });

    expect(response.status).toBe(400);

    expect(response.text).toBe('{"message":"\\"volumes\\" must be an array"}');
  });

  it("Should return quotes if the request is valid", async () => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        dispatchers: [
          {
            offers: [
              {
                offer: 1,
                table_reference: "649c324f81d30f670798e6bd",
                simulation_type: 0,
                carrier: {
                  name: "UBER",
                  registered_number: "17895646000187",
                  state_inscription: "120.361.287.119",
                  logo: "https://s3.amazonaws.com/public.prod.freterapido.uploads/transportadora/foto-perfil/17895646000187.png",
                  reference: 1647,
                  company_name: "UBER DO BRASIL TECNOLOGIA LTDA.",
                },
                service: "Normal",
                delivery_time: {
                  days: 4,
                  estimated_date: "2023-07-13",
                },
                expiration: "2023-08-06T02:30:06.813285791Z",
                cost_price: 65.28,
                final_price: 65.28,
                weights: {
                  real: 1,
                  cubed: 300,
                  used: 300,
                },
                original_delivery_time: {
                  days: 4,
                  estimated_date: "2023-07-13",
                },
              },
              {
                offer: 2,
                table_reference: "63b7fd854ed2f3f5dc78b4f5",
                simulation_type: 0,
                carrier: {
                  name: "CORREIOS",
                  registered_number: "34028316000103",
                  state_inscription: "ISENTO",
                  logo: "",
                  reference: 281,
                  company_name: "EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS",
                },
                service: "Normal",
                delivery_time: {
                  days: 8,
                  hours: 12,
                  minutes: 50,
                  estimated_date: "2023-07-19",
                },
                expiration: "2023-08-06T02:30:06.813296973Z",
                cost_price: 258.74,
                final_price: 258.74,
                weights: {
                  real: 1,
                  used: 167,
                },
                correios: {},
                original_delivery_time: {
                  days: 8,
                  hours: 12,
                  minutes: 50,
                  estimated_date: "2023-07-19",
                },
              },
              {
                offer: 3,
                table_reference: "646b59b451f2b9d5942d250a",
                simulation_type: 0,
                carrier: {
                  name: "BTU BRASPRESS",
                  registered_number: "48740351002702",
                  state_inscription: "103898530",
                  logo: "https://s3.amazonaws.com/public.prod.freterapido.uploads/transportadora/foto-perfil/48740351002702.png",
                  reference: 474,
                  company_name: "BRASPRESS TRANSPORTES URGENTES LTDA",
                },
                service: "Normal",
                delivery_time: {
                  days: 8,
                  hours: 12,
                  minutes: 50,
                  estimated_date: "2023-07-19",
                },
                expiration: "2023-08-06T02:30:06.813299494Z",
                cost_price: 271.62,
                final_price: 281.62,
                weights: {
                  real: 1,
                  cubed: 200,
                  used: 200,
                },
                original_delivery_time: {
                  days: 8,
                  hours: 12,
                  minutes: 50,
                  estimated_date: "2023-07-19",
                },
              },
            ],
          },
        ],
      },
    });
    prismaMock.quote.findMany.mockResolvedValue([
      {
        deadline: "4",
        id: "f3de8840-3201-4877-adb0-b570b11f818f",
        name: "UBER",
        price: new Decimal(58.95),
        service: "Normal",
        createdAt: new Date(),
      },
      {
        deadline: "6",
        id: "13f7b7f8-be52-43ed-a6a8-fb3e549aa6b4",
        name: "CORREIOS",
        price: new Decimal(86.58),
        service: "Normal",
        createdAt: new Date(),
      },
      {
        deadline: "6",
        id: "cb0f4656-9656-48be-ac43-e4519a301900",
        name: "CORREIOS",
        price: new Decimal(92.45),
        service: "PAC",
        createdAt: new Date(),
      },
    ]);

    const response = await request(app)
      .post("/quote")
      .send({
        recipient: {
          address: {
            zipcode: "12345678",
          },
        },
        volumes: [
          {
            category: 7,
            amount: 1,
            unitary_weight: 5,
            price: 349,
            sku: "abc-teste-123",
            height: 0.2,
            width: 0.2,
            length: 0.2,
          },
          {
            category: 7,
            amount: 2,
            unitary_weight: 4,
            price: 556,
            sku: "abc-teste-527",
            height: 0.4,
            width: 0.6,
            length: 0.15,
          },
        ],
      });

    //console.log("FAIL", response.body);

    expect(response.status).toBe(200);

    expect(response.body.carrier).toHaveLength(3);
  });

  it("Should return an error if the zipcode is not found", async () => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        dispatchers: [
          {
            offers: [],
          },
        ],
      },
    });

    const response = await request(app)
      .post("/quote")
      .send({
        recipient: {
          address: {
            zipcode: "12345678",
          },
        },
        volumes: [
          {
            category: 7,
            amount: 1,
            unitary_weight: 5,
            price: 349,
            sku: "abc-teste-123",
            height: 0.2,
            width: 0.2,
            length: 0.2,
          },
          {
            category: 7,
            amount: 2,
            unitary_weight: 4,
            price: 556,
            sku: "abc-teste-527",
            height: 0.4,
            width: 0.6,
            length: 0.15,
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"No offers found"}');
  });

  it("Should return an error if the request.body doesen't match the schema", async () => {
    const response = await request(app)
      .post("/quote")
      .send({
        something: {
          address: {
            zipcode: "12345678",
          },
        },
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe(
      '{"message":"\\"recipient\\" is required, \\"volumes\\" is required"}'
    );
  });
});
