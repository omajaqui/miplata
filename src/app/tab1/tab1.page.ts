import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  mesAno: any;
  categoriasBD: any[] = [];

  constructor() {    
    this.categoriasBD = [
      {name:'Sueldo', valor:' 950000', icon:'cash'},
      {name:'Deposito', valor:'325000', icon:'logo-bitcoin'},
      {name:'Ahorros', valor:'200000', icon:'pulse'},
      {name:'Otros', valor:'0', icon:'radio-button-on'},
    ];
  }

  ngOnInit() {
    this.fechaActual();
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
