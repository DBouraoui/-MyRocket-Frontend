export interface NavbarItems {
  title: string;
  link: string;
  icon: string;
  isOpen?: boolean;
  subContent?: SubContent[];
}

interface SubContent {
  title: string;
  link: string;
  icon: string;
  description: string;
}
