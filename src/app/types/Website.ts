export type Website = {
  uuid: string;
  title: string;
  description: string;
  url: string;
  status:string;
  type: string;
  createdAt: string;
  updatedAt: string;
  contract?: Contracts;
  maintenanceContract?: MaintenanceContract;
}

export type Contracts = {
  uuid: string;
  annualCost: string;
  tva: string;
  reccurence: string;
  createdAt: string;
  updatedAt: string;
  prestation: string;
  firstPaymentAt: string;
  lastPaymentAt: string;
  nextPaymentAt: string;
}

export type MaintenanceContract = {
  uuid: string;
  startAt:  string;
  endAt:  string;
  firstPaymentAt: string;
  nextPaymentAt:  string;
  lastPaymentAt:  string;
  monthlyCost:  number;
  reccurence:  string;
  createdAt:  string;
}
