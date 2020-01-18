import { Component, OnInit } from '@angular/core';
import {PersistenciaService} from '../services/persistencia.service';

import {GlobalService} from '../services/global.service';
import { Observable } from 'rxjs';
import { LiteralExpr } from '@angular/compiler';

import { ModalController } from '@ionic/angular';

//import pagina para cargar como modal
import { DetailIngresosPage} from '../pages/detail-ingresos/detail-ingresos.page';

// importo service
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  today: any;
  categoriasBD: any[] = [];
  listaIngresos:any[]=[]; 
  listaIngresos2:any;
  today1 = new Date();
  fecha:any;
  public userList : Observable<any[]> = new Observable<any[]>(); 


  constructor(
    public persistencia:PersistenciaService,
    public util: UtilService,
    public modalCtrl: ModalController,
    public global:GlobalService 
    ) {    
    /* this.categoriasBD = [
      {Descripcion:'Sueldo', Valor:' 950000', Icono:'cash'},
      {Descripcion:'Deposito', Valor:'325000', Icono:'logo-bitcoin'},
      {Descripcion:'Ahorros', Valor:'200000', Icono:'pulse'},
      {Descripcion:'Otros', Valor:'0', Icono:'radio-button-on'},
    ]; */
    //this.cargarListas();

    this.today = this.util.fechaActual();

  }

  async cargarListas()
  {
    console.log("entro a metodo cargarListas");
    this.fecha =this.today1.getFullYear() + '-' + ('0' + (this.today1.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today1.getDate()).slice(-2);
    console.log("consulta tab1 "+this.fecha);
    await this.Ingresos(this.fecha);
    //await this.GetCategorias();
  }

  async Ingresos(fecha:any){
    await this.persistencia.ListarMovimientos(fecha,1)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listaIngresos = lista;          
    })
    .catch( error => {
      console.error( error );
    });
    }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.cargarListas();
    console.log("Entro a clase tab1 ionViewWillEnter");
  }
  
  // este metodo crea un modal y le envia parametro
  async viewDetail(idSub, descripcion, icono) {
    const modalDetail = await this.modalCtrl.create({
      component: DetailIngresosPage,
      componentProps: { // envia parametros al modal
        'IdSubcategoria': idSub,
        'Descripcion': descripcion,
        'Icono': icono,
      } 
    });
    return await modalDetail.present();
  }

}
