import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderUpdateComponent } from '../order-update/order-update.component';
import { Order } from '../../models/order';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'order-read',
  templateUrl: './order-read.component.html',
  styleUrls: ['./order-read.component.scss'],
})
export class OrderReadComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  order: Order = {
    expectedDate: '',
    deliveryDate: '',
    orderStatus: '',
    orderPriority: '',
    generalContractor: '',
    jobSite: '',
    address: '',
    city: '',
    description: '',
    users: [],
  };

  description: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private orderService: OrderService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<OrderUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.order.id = this.data.id;
    this.findOrderById();
  }

  findOrderById() {
    this.orderService.findById(this.order.id).subscribe(
      (resp) => {
        this.order = resp;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  openPDF(): void {
    const print = document.getElementById('print');

    domtoimage.toPng(print!).then((imgData) => {
      const doc = new jsPDF('p', 'mm', 'a5');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save(
        'wallacebp-order-id-' +
          this.order.id +
          '-' +
          this.order.generalContractor +
          '.pdf'
      );
    });
  }

  close(ev: any) {
    this.dialogRef.close();
  }
}
