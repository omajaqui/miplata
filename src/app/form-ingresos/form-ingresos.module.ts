import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormIngresosPageRoutingModule } from './form-ingresos-routing.module';

import { FormIngresosPage } from './form-ingresos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormIngresosPageRoutingModule
  ],
  declarations: [FormIngresosPage]
})
export class FormIngresosPageModule {}
