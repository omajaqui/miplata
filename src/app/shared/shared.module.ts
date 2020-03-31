import { NgModule } from '@angular/core';

import { FormGastosPage } from '../form-gastos/form-gastos.page';
import { FormIngresosPage } from '../form-ingresos/form-ingresos.page';

@NgModule({
    imports: [
        
    ],
    declarations: [
        FormGastosPage,FormIngresosPage
    ],
    exports: [
        FormGastosPage,FormIngresosPage
    ]
})
export class SharedModule {}