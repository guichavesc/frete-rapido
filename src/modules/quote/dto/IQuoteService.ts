export type TCalculateRequest = {
  recipient: {
    address: {
      zipcode: string;
    };
  };
  volumes: {
    category: number;
    amount: number;
    unitary_weight: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
  }[];
};

export interface IQuoteService {
  calculate(data: TCalculateRequest): Promise<TCalculateResponse>;
}

export interface TCalculateResponse {
  dispatchers: Dispatcher[];
}

export interface Dispatcher {
  id: string;
  request_id: string;
  registered_number_shipper: string;
  registered_number_dispatcher: string;
  zipcode_origin: number;
  offers: Offer[];
  total_price: number;
}

export interface Offer {
  offer: number;
  table_reference: string;
  simulation_type: number;
  carrier: Carrier;
  service: string;
  delivery_time: DeliveryTime;
  expiration: string;
  cost_price: number;
  final_price: number;
  weights: Weights;
  original_delivery_time: OriginalDeliveryTime;
  correios?: Correios;
  service_code?: string;
  service_description?: string;
}

export interface Carrier {
  name: string;
  registered_number: string;
  state_inscription: string;
  logo: string;
  reference: number;
  company_name: string;
}

export interface DeliveryTime {
  days: number;
  estimated_date: string;
  hours?: number;
  minutes?: number;
}

export interface Weights {
  real: number;
  cubed?: number;
  used: number;
}

export interface OriginalDeliveryTime {
  days: number;
  estimated_date: string;
  hours?: number;
  minutes?: number;
}

export interface Correios {}
