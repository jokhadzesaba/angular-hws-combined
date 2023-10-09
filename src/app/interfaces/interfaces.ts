export interface User {
  email: string;
  password: string;
  confirmPassword: string;
  agreement: true;
  nickName: string;
  phoneNumber: string;
  website: string;
  isRemoving: boolean;
}
export interface Employee{
  id?:number,
  name: string;
  salary:number;
  age:number;
}
export interface RootObject {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
}
