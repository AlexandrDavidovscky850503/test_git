export interface UserData {
  firstName: string;
  lastName: string;
  birthDate?: string;
  email: string;
  token: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
}
