export type Transaction = {
  uuid: string;
  amount: string;
  tva: string | number;
  createdAt: string;
  user: string;
  userUuid: string;
  websiteContract: string;
  websiteUuid: string;
};
