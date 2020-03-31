import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {GlobalService} from '../services/global.service';
import { Observable, observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class PersistenciaService {

  db:SQLiteObject;
  today1 = new Date();
  fecha:any;

  constructor(public sqlite: SQLite,
              public global: GlobalService             ) {
    console.log('Hello PersistenciaProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    this.db = db;
    console.log("ya tiene la conexion" + JSON.stringify(this.db));
  }

  async GetSubcategorias(tipo:any){
    let sql = "SELECT * FROM TSUBCATEGORIAS WHERE Categoria = ?";
    console.log("antes de ejecutar la consulta TSUBCATEGORIAS");
    return await  this.db.executeSql(sql, [tipo])
    .then(response => {
      let lista =[];
      for (let index = 0; index < response.rows.length; index++) {
        lista.push({IdSubcategoria:response.rows.item(index).IdSubcategoria,Descripcion:response.rows.item(index).Descripcion , Icono:response.rows.item(index).Icono});
         // console.log("entro al for Catalogo " + response.rows.item(index).CATALOGUE_ID+ " "+ response.rows.item(index).ITEM_ID+ " " +response.rows.item(index).DESCRIPTION );
  
      }
      return Promise.resolve( lista );
    })
    .catch(error => Promise.reject(error));
  }

  async guardarMovimiento(listaDatos:any)
  {
    let sql=" INSERT INTO TMOVIMIENTOS (IdSubcategoria,IdCategoria,Valor,Nota,Fecha) VALUES(?,?,?,?,?) ";  
    
     
      console.log("crear movimientos "+ JSON.stringify(listaDatos) );
      return await new Promise((resolve,reject)=>{
  
        this.db.executeSql(sql, [listaDatos["subcategoria"],listaDatos["categoria"],listaDatos["valor"],listaDatos["nota"],listaDatos["fechaMovimiento"] ])
        .then((respuesta)=>{
        console.log("se inserto correctamente el registro en la tabla TMOVIMIENTOS ");   
         //this.GetMovimientos(); 
         //this.GetGastos('2020-01-04');  
         //this.fecha =this.today1.getFullYear() + '-' + ('0' + (this.today1.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today1.getDate()).slice(-2); 
         /*
         this.ListarMovimientos(this.fecha ,listaDatos["categoria"]).then(lista => {
          //console.log(lista_Catalogos);    
          this.global.listaIngresos= lista; 
          console.log(" tamaño lista global "+ this.global.listaIngresos.length) ;
            
        })
        .catch( error => {
          console.error( error );
        });*/
        resolve(respuesta);
  
      }).catch(error =>
        Promise.reject(error));
      
    })
  
  }

   GetMovimientos(){
    //let sql = "SELECT * FROM TMOVIMIENTOS";
    let sql = "SELECT MOV.IdMovimiento,MOV.IdSubcategoria,  MOV.Valor, MOV.Nota, MOV.Fecha FROM TMOVIMIENTOS MOV ";
    console.log("entro a la clase database1");
    return  this.db.executeSql(sql, [])
    .then(response => {
      let lista =[];
      for (let index = 0; index < response.rows.length; index++) {
        lista.push( {  
          IdMovimiento:response.rows.item(index).IdMovimiento,      
          Fecha:response.rows.item(index).Fecha,
          Nota: response.rows.item(index).Nota,
          Valor: response.rows.item(index).Valor,          
          IdSubcategoria : response.rows.item(index).IdSubcategoria
        } );
          console.log("entro al for2 TMOVIMIENTOS " + response.rows.item(index).IdSubcategoria+" "+response.rows.item(index).Valor+" "+response.rows.item(index).Fecha);
      }
      return Promise.resolve( lista );
    })
    .catch(error => Promise.reject(error));
  }

 ListarMovimientos(fecha:any, categoria:any){
    //let sql = "SELECT * FROM TMOVIMIENTOS";
    let sql = "SELECT M.IdSubcategoria, max(S.Descripcion) Descripcion, max(S.Icono) Icono, SUM(M.VALOR) Valor    FROM TMOVIMIENTOS M INNER JOIN TSUBCATEGORIAS S ON "+
               "M.IdSubcategoria = S.IdSubcategoria  WHERE fecha BETWEEN DATE( ?,'start of month') AND DATE( ?)  AND m.IdCategoria= ? "+
               " GROUP BY M.IdSubcategoria ORDER BY 4 DESC ;";           
    console.log("entro al metodo ListaMovimientos");
    return  this.db.executeSql(sql, [fecha,fecha,categoria])
    .then(response => {
      let lista =[];
      for (let index = 0; index < response.rows.length; index++) {
        lista.push( {  
          IdSubcategoria:response.rows.item(index).IdSubcategoria,      
          Descripcion:response.rows.item(index).Descripcion,
          Icono: response.rows.item(index).Icono,
          Valor: response.rows.item(index).Valor  
          
        } );
          console.log("entro ListaMovimientos" + response.rows.item(index).IdSubcategoria +" "+response.rows.item(index).Descripcion+" "+response.rows.item(index).Icono+" "+response.rows.item(index).Valor );
      }
      return Promise.resolve( lista );
    })
    .catch(error => Promise.reject(error));
  }

  ListarDetalleMovimientos(fecha:any, subcategoria:any){
    //let sql = "SELECT * FROM TMOVIMIENTOS";
    let sql = "SELECT fecha, Valor, Nota FROM TMOVIMIENTOS WHERE fecha BETWEEN DATE( ?,'start of month') AND DATE( ?) AND IdSubcategoria = ? order by fecha ;";           
    console.log("entro al metodo ListarDetalleMovimientos");
    return  this.db.executeSql(sql, [fecha,fecha,subcategoria])
    .then(response => {
      let lista =[];
      for (let index = 0; index < response.rows.length; index++) {
        lista.push( {  
          Fecha:response.rows.item(index).Fecha,      
          Nota:response.rows.item(index).Nota,         
          Valor: response.rows.item(index).Valor  
          
        } );
          console.log("entro ListarDetalleMovimientos" + response.rows.item(index).Fecha +" "+response.rows.item(index).Nota+" "+response.rows.item(index).Valor );
      }
      return Promise.resolve( lista );
    })
    .catch(error => Promise.reject(error));
  }


  async guardarMovimiento1(listaDatos:any)
  {
    let sql=" INSERT INTO TMOVIMIENTOS (IdSubcategoria,IdCategoria,Valor,Nota,Fecha) VALUES(?,?,?,?,?) ";  
    
     
      console.log("crear movimientos "+ JSON.stringify(listaDatos) );
      return await new Promise((resolve,reject)=>{
  
        this.db.executeSql(sql, [listaDatos["subcategoria"],listaDatos["categoria"],listaDatos["valor"],listaDatos["nota"],listaDatos["fechaMovimiento"] ])
        .then((respuesta)=>{
        console.log("se inserto correctamente el registro en la tabla TMOVIMIENTOS ");   
         //this.GetMovimientos(); 
         //this.GetGastos('2020-01-04');  
         this.fecha =this.today1.getFullYear() + '-' + ('0' + (this.today1.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today1.getDate()).slice(-2); 
         this.ListarMovimientos(this.fecha ,1).then(lista => {
          //console.log(lista_Catalogos);    
          this.global.listaIngresos= lista; 
          console.log(" tamaño lista global "+ this.global.listaIngresos.length) ;
            
        })
        .catch( error => {
          console.error( error );
        });
  
      }).catch(error =>
        Promise.reject(error));
      
    })
  
  }

  /*public getProducts(): Observable<TMovimentos[]> {
    
     return Observable.this.db.e.executeSql(sql, [listaDatos["subcategoria"],listaDatos["categoria"],listaDatos["valor"],listaDatos["nota"],listaDatos["fechaMovimiento"] ])
        .then((respuesta)=>{
        console.log("se inserto correctamente el registro en la tabla TMOVIMIENTOS ");   
         //this.GetMovimientos(); 
         //this.GetGastos('2020-01-04');  
         this.fecha =this.today1.getFullYear() + '-' + ('0' + (this.today1.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today1.getDate()).slice(-2); 
         this.ListarMovimientos(this.fecha ,1).then(lista => {
          //console.log(lista_Catalogos);    
          this.global.listaIngresos= lista; 
          console.log(" tamaño lista global "+ this.global.listaIngresos.length) ;
            
        })
        .catch( error => {
          console.error( error );
        });
    
  }*/


}
/*
export class TMovimentos {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}*/
