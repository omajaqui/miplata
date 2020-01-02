import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// ** componentes creados manualmente **
// componente para manejo de fabs
import { MovsComponent } from './movs/movs.component';

// paginas usadas como modal
import { FormGastosPage } from '../form-gastos/form-gastos.page';
import { FormIngresosPage } from '../form-ingresos/form-ingresos.page';

// se importan package par utilizar formularios de ingresos y gastos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovsComponent, FormGastosPage, FormIngresosPage
  ],
  entryComponents: [
    FormGastosPage, FormIngresosPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [MovsComponent],
})
export class ComponentsModule { }
