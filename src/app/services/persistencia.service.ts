import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';





@Injectable({
  providedIn: 'root'
})
export class PersistenciaService {

  db:SQLiteObject;

  constructor(public sqlite: SQLite              ) {
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
        lista.push({IdSubcategoria:response.rows.item(index).IdSubcategoria,Descripcion:response.rows.item(index).Descripcion });
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
         this.GetMovimientos();     
  
      }).catch(error =>{
        console.log("Error al insertar en la tabla TMOVIMIENTOS "+JSON.stringify(error));
      });
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
          console.log("entro al for2 TMOVIMIENTOS " + response.rows.item(index).IdSubcategoria);
      }
      return Promise.resolve( lista );
    })
    .catch(error => Promise.reject(error));
  }


}
