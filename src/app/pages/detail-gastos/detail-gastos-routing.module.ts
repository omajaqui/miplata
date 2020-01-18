import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailGastosPage } from './detail-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: DetailGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailGastosPageRoutingModule {}
