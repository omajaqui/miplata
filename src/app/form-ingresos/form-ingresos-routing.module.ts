import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormIngresosPage } from './form-ingresos.page';

const routes: Routes = [
  {
    path: '',
    component: FormIngresosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormIngresosPageRoutingModule {}
