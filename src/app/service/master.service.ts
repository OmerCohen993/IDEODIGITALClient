import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetAllInvoice() {
    return this.http.get('http://localhost:5223/invoices');
  }

  GetInvoice(invoicId: any) {
    return this.http.get('http://localhost:5223/invoices/invoice?id=' + invoicId);
  }

  SaveInvoice(invoicedata: any) {
    return this.http.post('http://localhost:5223/invoices', invoicedata);
  }

  RemoveInvoice(invoicId: any) {
    return this.http.delete('http://localhost:5223/invoices/?id=' + invoicId);
  }



}
