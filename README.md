<img src="./assets/frete-rapido-1.png" height="100">

<br>

# Welcome to Frete Rapido API - Hiring Process APP

### This application is an application to proof the containerized with docker

<br>

## Getting Start:

This application uses docker-compose to orchestrat the build and deployment. Inside the `.docker` folder, you can customize the application. Such as the database, is `Postgres` by the way.

```bash
$ docker-compose up
```

After running the docker-compose, you'll be able to use HTTP request tool, such as Insomnia or Postman, on the `http://localhost:3000`.

<br>

## Quote Route

<br>

This route is responsible to retrieve the carrier and freight options

<br>

**_POST_** / quote

#### Request:

```json
{
  "recipient": {
    "address": {
      "zipcode": "8888888"
    }
  },
  "volumes": [
    {
      "category": 7,
      "amount": 1,
      "unitary_weight": 5,
      "price": 349,
      "sku": "abc-teste-123",
      "height": 0.2,
      "width": 0.2,
      "length": 0.2
    },
    {
      "category": 7,
      "amount": 2,
      "unitary_weight": 4,
      "price": 556,
      "sku": "abc-teste-527",
      "height": 0.4,
      "width": 0.6,
      "length": 0.15
    }
  ]
}
```

<br>

## Metrics Route

<br>

This route is responsible to retrieve the carrier and freight options

<br>

**_GET_** /quote/metrics?last_quotes=2

```
last_quotes is optional - must be a number
```

#### Response:

```json
{
  "metrics": {
    "totalQuotes": 2,
    "totalQuotesPerCarrier": {
      "CORREIOS": 2
    },
    "totalPricePerCarrier": {
      "CORREIOS": 249.26
    },
    "priceAveragePerCarrier": {
      "CORREIOS": 102.98
    },
    "cheapestPricePerCarrier": {
      "id": "47aa1357-9795-400d-9a35-ea49f9c30d3d",
      "name": "CORREIOS",
      "service": "Normal",
      "deadline": "7",
      "price": 86.58
    },
    "expensivePricePerCarrier": {
      "id": "f6427a80-45fc-44a1-a64c-7e7c5c4a222c",
      "name": "CORREIOS",
      "service": "SEDEX",
      "deadline": "3",
      "price": 162.68
    }
  }
}
```

## Unit Tests and E2E tests

In order to make the application safe, I tried to follow the TDD methodology, which means the application is testable. And we have two types of tests, the unit tests which are concentrated to the use-case layer, and e2e tests, where the tests go over the general functionality of the application.

> to run unit tests - use the following command:

```bash
$ yarn test
```

> to run e2e tests - use the following command:

```bash
$ yarn test:e2e
```
