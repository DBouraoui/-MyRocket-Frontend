type Pictures = {
  filename: string;
  url:string;
}

type Link = {
  url: string;
  type: string;
}

export type Project = {
  uuid: string;
  title: string;
  description: string;
  tags: string[];
  link: Link[];
  createdAt: string;
  updatedAt: string;
  pictures: Pictures[];
}
