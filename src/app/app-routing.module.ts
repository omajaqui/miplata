import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormGastosPage} from '../app/form-gastos/form-gastos.page';
import{FormIngresosPage} from '../app/form-ingresos/form-ingresos.page';


const routes: Routes = [

  // el siguiente objeto es utilizado para redirigir la pagina de inicio
  // o la primera pagina que se muestra al abril la aplicacion.
  /* {
    path: '', 
    redirectTo: 'splash', 
    pathMatch: 'full'
  }, */
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
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'detail-ingresos',
    loadChildren: () => import('./pages/detail-ingresos/detail-ingresos.module').then( m => m.DetailIngresosPageModule)
  },
  {
    path: 'detail-gastos',
    loadChildren: () => import('./pages/detail-gastos/detail-gastos.module').then( m => m.DetailGastosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
