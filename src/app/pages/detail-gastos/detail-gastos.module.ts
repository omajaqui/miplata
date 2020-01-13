import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailGastosPageRoutingModule } from './detail-gastos-routing.module';

import { DetailGastosPage } from './detail-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailGastosPageRoutingModule
  ],
  declarations: [DetailGastosPage]
})
export class DetailGastosPageModule {}
