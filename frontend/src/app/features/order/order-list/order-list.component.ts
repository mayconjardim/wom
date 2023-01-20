import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  orders = ELEMENT_DATA;
  panelOpenState = false;

  priorityColor(priority: string) {
    if (priority == 'LOW') {
      return 'assets/icons/low';
    } else {
      return '';
    }
  }
}
export interface PeriodicElement {
  id: number;
  startDate: string;
  expectDate: string;
  deliveryDate: string;
  orderStatus: string;
  orderPriority: string;
  generalContractor: string;
  manager: string;
  yard: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'CLOSED',
    orderPriority: 'LOW',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 2,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'PROCESSING',
    orderPriority: 'HIGH',
    generalContractor: 'Shareef Abdur-Rahim',
    manager: 'Shaquille O Neal',
    yard: 'Jason Tatum',
  },
  {
    id: 3,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'OPEN',
    orderPriority: 'LOW',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 4,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '',
    orderStatus: 'PROCESSING',
    orderPriority: 'HIGH',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 5,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'CLOSED',
    orderPriority: 'LOW',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 6,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '',
    orderStatus: 'OPEN',
    orderPriority: 'MEDIUM',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 7,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'PROCESSING',
    orderPriority: 'MEDIUM',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 8,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '',
    orderStatus: 'OPEN',
    orderPriority: 'LOW',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 9,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'CLOSED',
    orderPriority: 'LOW',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
  {
    id: 10,
    startDate: '2023-01-19',
    expectDate: '2023-01-19',
    deliveryDate: '2023-01-19',
    orderStatus: 'CLOSED',
    orderPriority: 'HIGH',
    generalContractor: 'LeBron James',
    manager: 'Kevin Durant',
    yard: 'Jason Tatum',
  },
];
