import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailIngresosPage } from './detail-ingresos.page';

const routes: Routes = [
  {
    path: '',
    component: DetailIngresosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailIngresosPageRoutingModule {}
