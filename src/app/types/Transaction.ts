export type Transaction = {
  uuid: string;
  amount: string;
  tva: string | number;
  createdAt: string;
  user: string;
  userUuid: string;
  websiteContract: string;
  websiteUuid: string;
  isPaid: boolean;
};

export type TransactionUser = {
  uuid: string;
  email: string;
  websiteContracts?: TransactionContract;
};

export type TransactionContract = {
  uuid: string;
  name: string;
};
