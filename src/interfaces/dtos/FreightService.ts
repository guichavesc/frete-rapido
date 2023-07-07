export type IFreightServiceData = {
  recipient: {
    type: 0 | 1;
    registered_number: string;
    state_inscription: string;
    country: string;
    zipcode: number;
  };
  dispatchers: {
    registered_number: string;
    zipcode: number;
    total_price: number;
    volumes: {
      amount: number;
      amount_volumes: number;
      category: string;
      sku: string;
      tag: string;
      description: string;
      height: number;
      width: number;
      length: number;
      unitary_price: number;
      unitary_weight: number;
      consolidate: boolean;
      overlaid: boolean;
      rotate: boolean;
    }[];
  }[];
};

export interface IFreightService {
  calculateFreight(data: IFreightServiceData): Promise<void>;
}
