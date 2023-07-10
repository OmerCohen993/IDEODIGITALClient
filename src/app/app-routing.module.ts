import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';

const routes: Routes = [
  { component: ListingComponent, path: "" },
  { component: CreateinvoiceComponent, path: "createinvoice" },
  { component: CreateinvoiceComponent, path: "creatinvoice/:invoiceno" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
