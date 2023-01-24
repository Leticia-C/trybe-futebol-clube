export interface ILogin {
  email?: string;
  password?: string;
}

export default interface IUsers extends ILogin {
  id: number;
  username: string;
  role?: string;
}
