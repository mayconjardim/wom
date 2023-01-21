import { User } from '../../users/models/user';

export interface Order {
  content: [
    {
      id: number;
      startDate: string;
      expectDate: string;
      deliveryDate: null;
      orderStatus: string;
      orderPriority: string;
      generalContractor: string;
      jobSite: string;
      address: string;
      city: string;
      description: string;
      users: User[];
    }
  ];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: true;
  numberOfElements: number;
  empty: boolean;
}
