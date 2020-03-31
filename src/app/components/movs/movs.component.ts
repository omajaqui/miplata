import { Component, Input, OnInit } from '@angular/core';
import { ModalController,NavController } from '@ionic/angular';
import { FormGastosPage } from '../../form-gastos/form-gastos.page';
import { FormIngresosPage } from '../../form-ingresos/form-ingresos.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movs',
  templateUrl: './movs.component.html',
  styleUrls: ['./movs.component.scss'],
})
export class MovsComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
 // @Input('nombre') nombre: string;

  today: any;
  returnGastos: any;
  returnIngresos: any;

  constructor(
    public modalCtrl: ModalController,
    public router:Router,
    public navController:NavController
  ) {

    console.log("se abre openFormGastos");
  }

  ngOnInit() {}
/*
  async openFormGastos() {
    this.navController.navigateRoot(['/form-gastos']);   
   // this.router.navigate(['/form-gastos'],{replaceUrl:true});
    
  }*/

  
  async openFormGastos() {
    const modalGastos = await this.modalCtrl.create({
      component: FormGastosPage,
      componentProps: { // envia parametros al modal
        // tslint:disable-next-line:object-literal-key-quotes
        'paramID': 123,
        // tslint:disable-next-line:object-literal-key-quotes
        'paramTitle': 'Formulario Gastos'
      }
    });

    // **recibe parametros al cerrar el modal
    modalGastos.onDidDismiss().then((returnGastos) => {
      console.log("antes de verificar valor"+ JSON.stringify(returnGastos));
      if (returnGastos !== null ) {
        //el objeto 'returnGastos' contiene todos los datos que se reciben
        console.log("se cierra openFormGastos");
        this.returnGastos = returnGastos.data;         
          console.log("return valor form gastos: " + this.returnGastos['valor']);
          console.log("return categoria form gastos: " + this.returnGastos['subcategoria']);
          console.log("return nota form gastos: " + this.returnGastos['nota']);
          //this.router.navigate(['/']);
          this.navController.navigateRoot(['/']);
      }
    });    
    console.log('ejecuta Function openFormGastos correctamente');
    return await modalGastos.present();
    
  }
/*
  async openFormIngresos() {

    this.navController.navigateRoot(['/form-ingresos']);
    //this.router.navigate(['/form-gastos'],{replaceUrl:true});    
  }*/


  async openFormIngresos() {
    const modalIngresos = await this.modalCtrl.create({
      component: FormIngresosPage,
      componentProps: { // envia parametros al modal
        // tslint:disable-next-line:object-literal-key-quotes
        'paramID': 123,
        // tslint:disable-next-line:object-literal-key-quotes
        'paramTitle': 'Formulario Ingresos'
      }
    });
    // **recibe parametros al cerrar el modal
    modalIngresos.onDidDismiss().then((returnIngresos) => {
      console.log("antes de verificar valor"+ JSON.stringify(returnIngresos).trim());
      if (returnIngresos['data'] !== null ) {
        //el objeto 'returnGastos' contiene todos los datos que se reciben
        this.returnIngresos = returnIngresos.data;         
          console.log("return valor form Ingresos: "     + this.returnIngresos['valor']);
          console.log("return categoria form Ingresos: " + this.returnIngresos['subcategoria']);
          console.log("return nota form Ingresos: "      + this.returnIngresos['nota']);
          //this.router.navigate(['/']);
          this.navController.navigateRoot(['/']);
      }
    });
    console.log('ejecuta Function openFormIngresos correctamente');
    return await modalIngresos.present();
  }

  /* fechaActual() {
    // Formato para mostrar la fecha
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let stringDate = date.toLocaleDateString('es-CO', options);
    stringDate = stringDate.charAt(0).toUpperCase() + stringDate.slice(1);
    this.today = stringDate;
    return this.today;
  } */

}
