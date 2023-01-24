import { User } from '../../users/models/user';

export interface Order {
  id?: number;
  startDate: string;
  expectedDate: string;
  deliveryDate?: string;
  orderStatus: string;
  orderPriority: string;
  generalContractor: string;
  jobSite: string;
  address: string;
  city: string;
  description: string;
  managerName: string;
  yardName: string;
  users: User[];
}

export interface Pagination {
  content: Order[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
