import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { DetailGastosPage } from '../pages/detail-gastos/detail-gastos.page';

// modulo de componentes
import { ComponentsModule } from '../components/components.module';

@NgModule({
  entryComponents: [
    DetailGastosPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, DetailGastosPage]
})
export class Tab3PageModule {}
