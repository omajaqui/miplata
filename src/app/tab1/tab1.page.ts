import { Component, OnInit } from '@angular/core';
import {PersistenciaService} from '../services/persistencia.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  mesAno: any;
  categoriasBD: any[] = [];
  listaIngresos:any[]=[];

  constructor( public persistencia:PersistenciaService) {    
    /*this.categoriasBD = [
      {name:'Sueldo', valor:' 950000', icon:'cash'},
      {name:'Deposito', valor:'325000', icon:'logo-bitcoin'},
      {name:'Ahorros', valor:'200000', icon:'pulse'},
      {name:'Otros', valor:'0', icon:'radio-button-on'},
    ];*/
    //this.cargarListas();
  }

  async cargarListas()
  {
    console.log("entro a metodo cargarListas");
    await this.Ingresos('2020-01-06');
    //await this.GetCategorias();
  }

  async Ingresos(fecha:any){
    await this.persistencia.ListaMovimientos(fecha,1)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listaIngresos = lista;     
        
    })
    .catch( error => {
      console.error( error );
    });
    }

  ngOnInit() {
    this.fechaActual();   
  }

  ionViewWillEnter()
  {
    this.cargarListas();
    console.log("Entro a clase tab1 ionViewWillEnter");
  }

 

  fechaActual() {
    // Formato para mostrar la fecha
    const date = new Date();
    const options = { 
      /* weekday: 'long', */ 
      year: 'numeric', 
      month: 'long', 
      /* day: 'numeric' */ 
    };
    let stringDate = date.toLocaleDateString('es-CO', options);
    stringDate = stringDate.charAt(0).toUpperCase() + stringDate.slice(1);
    this.mesAno = stringDate;
    return this.mesAno;
  }

  

}
