export type ContactImage = {
  filename: string;
  url: string;
}

export type Contact = {
  uuid: string;
  firstname: string;
  lastname: string;
  companyName: string;
  email: string;
  title: string;
  description: string;
  tags: string[];
  pictures: ContactImage[];
}

export type ContactsResponse = {
  success: boolean;
  data: Contact[];
}
