import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent {

  constructor(private builder: FormBuilder, private service: MasterService, private router: Router,
    private alert: ToastrService, private activeroute: ActivatedRoute) { }

  pagetitle = "Create Invoice";
  editinvoice: any;
  isedit = false;

  ngOnInit() {
    this.editinvoice = this.activeroute.snapshot.paramMap.get('invoicDbId');
    if (this.editinvoice != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
      console.log(this.editinvoice);
      this.GetIncoice(this.editinvoice);
    }
  }

  invoiceform = this.builder.group({
    id: this.builder.control(''),
    invoiceId: this.builder.control('', Validators.required),
    customerName: this.builder.control('', Validators.required),
    deliveryAddress: this.builder.control(''),
    status: this.builder.control(0),
    total: this.builder.control(0),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true })

  });

  GetIncoice(invoiceId: any) {
    console.log("GetIncoice:  " + invoiceId)
    this.service.GetInvoice(invoiceId).subscribe(res => {
      let invoice: any;
      invoice = res;
      if (invoice != null) {
        this.invoiceform.patchValue({
          id: invoice.id,
          invoiceId: invoice.invoiceId, customerName: invoice.customerName, deliveryAddress: invoice.deliveryAddress,
          status: invoice.status, total: invoice.total, netTotal: invoice.netTotal, tax: invoice.tax
        })
      }
    });
  }


  SaveInvoice() {
    if (this.invoiceform.valid) {
      let check = this.invoiceform.getRawValue();
      if (this.isedit) {
        console.log(this.invoiceform.getRawValue());
        this.service.UpdateInvoice(this.invoiceform.getRawValue()).subscribe(res => {
          let result: any;
          result = res;
          console.log(result.id != null);
          console.log(result);
          if (result.id != null) {
            if (this.isedit) {
              this.alert.success('Invoice editing Success');
            } else {
              this.alert.success('Created Successfully');
            }
            this.router.navigate(['/']);
          } else {
            this.alert.error('Failed to save.', 'Invoice');
          }
        });
      } else {
        this.service.SaveInvoice(this.invoiceform.getRawValue()).subscribe(res => {
          let result: any;
          result = res;
          console.log(result.id != null);
          console.log(result);
          if (result.id != null) {
            if (this.isedit) {
              this.alert.success('Invoice editing Success');
            } else {
              this.alert.success('Created Successfully');
            }
            this.router.navigate(['/']);
          } else {
            this.alert.error('Failed to save.', 'Invoice');
          }
        });
      }


    } else {
      this.alert.warning('please fill all the required fields', 'Validation')
    }
  }

  summarycalculation() {

    let total = this.invoiceform.getRawValue().total;
    console.log("total: " + total);
    let sumtotal = 0;
    if (total) {
      sumtotal = total;
    }


    let sumtax = (17 / 100) * sumtotal;
    let nettotal = sumtotal + sumtax;

    this.invoiceform.get("tax")?.setValue(sumtax);
    this.invoiceform.get("netTotal")?.setValue(nettotal);
  }

  statusList = [
    { name: "DRAFT", value: 0 },
    { name: "UNPAID", value: 1 },
    { name: "PAID", value: 2 },
    { name: "REFUNDED", value: 3 },
    { name: "FAILED", value: 4 }
  ]

}
