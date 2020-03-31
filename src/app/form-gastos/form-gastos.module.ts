import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGastosPageRoutingModule } from './form-gastos-routing.module';

import { FormGastosPage } from './form-gastos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGastosPageRoutingModule
  ],
  declarations: [FormGastosPage]
})
export class FormGastosPageModule {}
