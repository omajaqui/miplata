import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
