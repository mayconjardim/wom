import { Role } from './role';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  roles: Role[];
}
