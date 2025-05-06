export interface Notification {
  uuid: string;
  title:string;
  description:string;
  createdAt:string;
  isPriority:boolean;
  readingAt?:string;
}
