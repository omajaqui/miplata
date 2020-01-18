import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  listaIngresos:any[]=[];
  listaGastos:any[]=[];

  constructor() { }
}
