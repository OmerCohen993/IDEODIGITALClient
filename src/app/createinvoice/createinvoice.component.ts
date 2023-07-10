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
    private alert: ToastrService) { }

  pagetitle = "Create Invoice";

  ngOnInit() {

  }

  invoiceform = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    customerName: this.builder.control('', Validators.required),
    deliveryAddress: this.builder.control(''),
    status: this.builder.control(0),
    total: this.builder.control(0),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true })

  });

  SaveInvoice() {
    if (this.invoiceform.valid) {
      this.service.SaveInvoice(this.invoiceform.getRawValue()).subscribe(res => {
        let result: any;
        result = res;
        console.log(result.id != null);
        if (result.id != null) {
          // if (this.isedit) {
          this.alert.success('Updated Successfully.', 'Invoice :');
          // } else {
          //   this.alert.success('Created Successfully.', 'Invoice :');
          // }
          this.router.navigate(['/']);
        } else {
          this.alert.error('Failed to save.', 'Invoice');
        }
      });

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
