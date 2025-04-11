type Pictures = {
  filename: string;
  url:string;
}

export type Project = {
  uuid: string;
  title: string;
  description: string;
  tags: string[];
  link: string[];
  createdAt: string;
  updatedAt: string;
  picture: Pictures[];
}
