import { Component } from '@angular/core';
import { MasterService } from '../service/master.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {

  constructor(private service: MasterService, private alert: ToastrService, private router: Router) { }

  invoicesList: any;
  invoice: any;

  ngOnInit() {
    this.GetIncoices();
  }

  GetIncoices() {
    this.service.GetAllInvoice().subscribe(invoice => {
      this.invoicesList = invoice;
    });
  }


  EditeInvoice(invoiceId: any) {
    this.router.navigateByUrl('/creatinvoice/' + invoiceId);
  }

  DeleteInvoice(invoiceId: any) {
    if (confirm('Delete Invoice? ')) {
      this.service.RemoveInvoice(invoiceId).subscribe(res => {
        let result: any;
        result = res;
        console.log(result.result);
        if (result.result === 'pass') {
          this.alert.success('Removed Successfully.', 'Remove Invoice')
          this.GetIncoices();
        } else {
          this.alert.error('Failed to Remove.', 'Invoice');
        }
      });
    }
  }

  statusList = [
    { name: "DRAFT", value: 0 },
    { name: "UNPAID", value: 1 },
    { name: "PAID", value: 2 },
    { name: "REFUNDED", value: 3 },
    { name: "FAILED", value: 4 }
  ]

}
