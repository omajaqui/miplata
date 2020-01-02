import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'form-ingresos',
    loadChildren: () => import('./form-ingresos/form-ingresos.module').then( m => m.FormIngresosPageModule)
  },
  {
    path: 'form-gastos',
    loadChildren: () => import('./form-gastos/form-gastos.module').then( m => m.FormGastosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
