import { UserAdmin } from './User';

export type Website = {
  uuid: string;
  title: string;
  description: string;
  url: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  hasConfig: string;
  contract?: Contracts;
  maintenanceContract?: MaintenanceContract;
  user?: UserAdmin;
  websiteMutualised?: mutualised;
  websiteVps?: VPS;
};

export type Contracts = {
  uuid: string;
  monthlyCost: string;
  tva: string;
  reccurence: string;
  createdAt: string;
  updatedAt: string;
  prestation: string;
  firstPaymentAt: string;
  lastPaymentAt: string;
  nextPaymentAt: string;
};

export type MaintenanceContract = {
  uuid: string;
  startAt: string;
  endAt: string;
  firstPaymentAt: string;
  nextPaymentAt: string;
  lastPaymentAt: string;
  monthlyCost: number;
  reccurence: string;
  createdAt: string;
};

export type VPS = {
  uuid: string;
  address: string;
  username: string;
  password: string;
  port: string;
  publicKey: string;
  updatedAt: string;
  createdAt: string;
};

export type mutualised = {
  uuid: string;
  address: string;
  username: string;
  password: string;
  port: string;
  createdAt: string;
  updatedAt: string;
};
