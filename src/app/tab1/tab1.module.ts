import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

// modulo de componentes
import { ComponentsModule } from '../components/components.module';

// importo pagina que se usara como modal
import { DetailIngresosPage } from '../pages/detail-ingresos/detail-ingresos.page';


@NgModule({
  entryComponents: [
    DetailIngresosPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, DetailIngresosPage]
})
export class Tab1PageModule {}
