import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import{BasedatosService} from '../app/services/basedatos.service';

// importo la pagina que se usara como splash
import {SplashPage} from './pages/splash/splash.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private base_datos:BasedatosService,
    public modalCtrl: ModalController, 
  ) {
    platform.ready().then(async () => {
      statusBar.styleDefault();
      const splash = await modalCtrl.create({
        component: SplashPage,
      });
      return await splash.present();
    });
  }

  // deshalito siguiente bloque para usar mismo metodo
  // en el constructor, llamando un nuevo splash
  /* initializeApp() {    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide(); // se deshabilita esta line apara el usos de splash alternativo
    });    
  } */
}
