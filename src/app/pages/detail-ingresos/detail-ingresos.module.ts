import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailIngresosPageRoutingModule } from './detail-ingresos-routing.module';

import { DetailIngresosPage } from './detail-ingresos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailIngresosPageRoutingModule
  ],
  declarations: [DetailIngresosPage]
})
export class DetailIngresosPageModule {}
