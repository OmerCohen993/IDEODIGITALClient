import { Component } from '@angular/core';
import { MasterService } from '../service/master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {

  constructor(private service: MasterService, private modalservice: NgbModal) { }

  invoicesList: any;

  ngOnInit() {
    this.GetIncoices();
  }

  GetIncoices() {
    this.service.GetAllInvoice().subscribe(invoice => {
      this.invoicesList = invoice;
    });
  }

}
