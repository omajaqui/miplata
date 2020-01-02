import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGastosPage } from '../../form-gastos/form-gastos.page';
import { FormIngresosPage } from '../../form-ingresos/form-ingresos.page';

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
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {}

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
      if (returnGastos !== null ) {
        //el objeto 'returnGastos' contiene todos los datos que se reciben
        this.returnGastos = returnGastos.data;         
          console.log("return valor form gastos: " + this.returnGastos['valorGasto']);
          console.log("return categoria form gastos: " + this.returnGastos['categoria']);
          console.log("return nota form gastos: " + this.returnGastos['notaGasto']);
      }
    });    
    console.log('ejecuta Function openFormGastos correctamente');
    return await modalGastos.present();
  }

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
      if (returnIngresos !== null ) {
        //el objeto 'returnGastos' contiene todos los datos que se reciben
        this.returnIngresos = returnIngresos.data;         
          console.log("return valor form Ingresos: "     + this.returnIngresos['valorIngreso']);
          console.log("return categoria form Ingresos: " + this.returnIngresos['categoria']);
          console.log("return nota form Ingresos: "      + this.returnIngresos['notaIngreso']);
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
