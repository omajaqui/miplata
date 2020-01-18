import { Component, OnInit } from '@angular/core';
import {PersistenciaService} from '../services/persistencia.service';
import {GlobalService} from '../services/global.service';
import { Observable } from 'rxjs';
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  mesAno: any;
  categoriasBD: any[] = [];
  listaIngresos:any[]=[]; 
  listaIngresos2:any;
  today1 = new Date();
  fecha:any;
  public userList : Observable<any[]> = new Observable<any[]>(); 

  constructor( public persistencia:PersistenciaService,
               public global:GlobalService ) {    
    /*this.categoriasBD = [
      {name:'Sueldo', valor:' 950000', icon:'cash'},
      {name:'Deposito', valor:'325000', icon:'logo-bitcoin'},
      {name:'Ahorros', valor:'200000', icon:'pulse'},
      {name:'Otros', valor:'0', icon:'radio-button-on'},
    ];*/
    //this.cargarListas();
     /*let listaIngresos3=  new Observable(subscriber => {
      subscriber.next( this.listaIngresos);
      });*/
     
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
