import { signalStore, withState } from '@ngrx/signals';

type User = {
  firstname? : string;
  lastname? : string;
  companyName? : string;
  email : string;
  phone : string;
  password: string;
  address : string;
  postCode: string;
  city: string;
  country: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;

}

const initialUser : User = {
  firstname: "",
  lastname: "",
  companyName: "",
  email: "",
  phone: "",
  password: "",
  address: "",
  postCode: "",
  city: "",
  country: "",
  }

  export const UserStore = signalStore(
    withState<User>(initialUser)
  )
