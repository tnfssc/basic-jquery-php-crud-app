export interface Person {
  id?: number;
  first_name: string;
  last_name: string;
  age: number;
  address: string;
  occupation: string;
  gender: string;
  created_at?: string | Date;
}
