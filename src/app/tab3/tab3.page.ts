import { Component, OnInit } from '@angular/core';
import {PersistenciaService} from '../services/persistencia.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  mesAno: any;
  subCatGastos: any[] = [];
  listaGastos:any[]=[];

  constructor(public persistencia:PersistenciaService) {
    /*this.subCatGastos = [ 
      {name:"Automóvil",  valor:"2", icon:'car'},
      {name:'Factura', valor:'180000', icon:'paper'},
      {name:'Ropa', valor:'300000', icon:'shirt'},
      {name:'Entretenimiento', valor:'80000', icon:'reverse-camera'},
      {name:'Venecas', valor:'250000', icon:'woman'},
      {name:'Comida', valor:'250000', icon:'restaurant'},
      {name:'Gasolina', valor:'120000', icon:'speedometer'},
      {name:'General', valor:'80000', icon:'checkbox-outline'},
      {name:'Regalos', valor:'90000', icon:'cube'},
      {name:'Salud', valor:'450000', icon:'medkit'},
      {name:'Vacaciones', valor:'2400000', icon:'paper-plane'},
      {name:'Hogar', valor:'650000', icon:'home'},
      {name:'Niños', valor:'200000', icon:'sad'},
      {name:'Otros', valor:'120000', icon:'sync'},      
    ];*/
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

  async cargarListas()
  {
    console.log("entro a metodo cargarListas");
    await this.Ingresos('2020-01-06');
    //await this.GetCategorias();
  }

  async Ingresos(fecha:any){
    await this.persistencia.ListarMovimientos(fecha,2)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listaGastos = lista;     
        
    })
    .catch( error => {
      console.error( error );
    });
    }

}
