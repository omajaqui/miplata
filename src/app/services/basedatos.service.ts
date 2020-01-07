import { Injectable, } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {  Platform } from '@ionic/angular';
import {PersistenciaService} from '../services/persistencia.service';

import{Categorias} from '../interfaces/Categorias';

import{Subcategorias} from '../interfaces/Subcategorias';
import{CATEGORIAS} from '../data/Categorias';
import{SUBCATEGORIAS} from '../data/Subcategorias';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  private isOpen:any;
  db:SQLiteObject;
  insertRowsDetail =[];
  listaSubcategorias:Subcategorias[]=[];
  listaCategorias:Categorias[]=[];

  insertSubcategorias = [];
  insertCategorias = [];

  constructor(private sqlite: SQLite,
    public platform: Platform,
    public persistencia:PersistenciaService) { 
console.log("esto es una prueba");

      this.listaCategorias =CATEGORIAS.slice();
      this.listaSubcategorias = SUBCATEGORIAS.slice();
  
    this.platform.ready().then(() => {      
      console.log("antes de ingresar al metodo para crear BD");           
      this.createDatabase2();  
    });
  }

  private async createDatabase2(){ //async await

    await this.crearBD();
    const data=await this.consultar_parametro_control();
    console.log("despues de consultar existencia de control "+ this.isOpen  +" VALOR DE DATA"+JSON.stringify(data));
    this.isOpen = data;

    if(!this.isOpen)
  {
    console.log("Entro a al if de crear tablas");
    //this.crearTablasBD();
  //await this.construir_insert_t_movimientos();
     await this.construir_insert();
    this.crear_t_pap_control_db();
    this.crear_t_movimientos2();
    console.log("DESPUES DE METODO  crear_t_movimientos");
    this.crear_t_subcategorias();
    console.log("DESPUES DE METODO  crear_t_causales_movimientos");
    this.crear_t_categorias();
    console.log("DESPUES DE METODO  crear_t_categorias");

  }else{
   // this.GetMovimientos();
    console.log("Ya las tablas fueron creadas por lo tanto no ingresa por este bloque");
  }

  }
   
  async crearBD()
  {
        return await new Promise((resolve,reject)=>{
  
          this.sqlite.create({ name: 'Miplata.db',location: 'default' // the location field is required
          }).then(async(db)=>{
            this.db= db;
            //console.log("objeto SQLiteObject" +JSON.stringify(db));
            this.persistencia.setDatabase(db);
            console.log("se creo la bd");
          resolve(db);
        },(error)=>{
          console.log("error al crear la base de datos"+ JSON.stringify(error));
          reject(error);
  
        });
      })
  }

  async consultar_parametro_control()
  {
    try{
            return await new Promise((resolve,reject)=>{
            let sql = "SELECT ITEM_ID FROM T_PAP_CONTROL_DB WHERE ID = ?";

            this.db.executeSql(sql, ["OPEN"]).then((data)=>{
            console.log("select de la tabla muestra "+ data.rows.item(0).ITEM_ID);

              resolve(data.rows.item(0).ITEM_ID);
          },(error)=>{
            console.log("error al consultar en la tabla T_PAP_CONTROL_DB"+ JSON.stringify(error));
            reject(null);
          });
        })
    }catch(erro)
    {
      console.log("error consultando la tabla de control");
    }
  }


  construir_insert()
  {
    this.listaSubcategorias.forEach(item=>{      
      this.insertSubcategorias.push([
        "INSERT INTO TSUBCATEGORIAS (IdSubcategoria,Descripcion,Categoria, Icono)VALUES(?,?,?,?) ",
        [item.IdSubcategoria, item.Descripcion, item.Categoria, item.Icono]
      ]);
    }); 
    
    this.listaCategorias.forEach(item=>{      
      this.insertCategorias.push([
        "INSERT INTO TCATEGORIAS (IdCategoria,Descripcion)VALUES(?,?) ",
        [item.IdCategoria, item.Descripcion]
      ]);
    })
  } 

  crear_t_pap_control_db()
{
  return   new Promise((resolve,reject)=>{
     this.db.executeSql("CREATE TABLE IF NOT EXISTS T_PAP_CONTROL_DB (ID VARCHAR(20) NOT NULL,ITEM_ID VARCHAR(20) , PRIMARY KEY(ID))",[])
  .then((respuesta)=>{
    console.log("se creo correctamente la tabla T_PAP_CONTROL_DB");
    //***************************************segmento para insertar un registro********* */
      let sql="INSERT INTO T_PAP_CONTROL_DB (ID , ITEM_ID  )VALUES(?,?)";
      this.db.executeSql(sql, ["OPEN","1"])
      .then((respuesta)=>{
        console.log("se inserto correctamente el registro en la tabla T_PAP_CONTROL_DB");
      }).catch(error =>{
        console.log("Error al insertar en la tabla T_PAP_CONTROL_DB"+JSON.stringify(error));
      });
    //************************************************************************************ */
  }).catch(error =>{
    console.error("error al crear la tabla T_PAP_CONTROL_DB "+JSON.stringify(error));
  });
})
}

crear_t_movimientos2()
{
    return  new Promise((resolve,reject)=>{
      this.db.executeSql("CREATE TABLE IF NOT EXISTS TMOVIMIENTOS (IdMovimiento INTEGER  NOT NULL,IdSubcategoria INTEGER,IdCategoria INTEGER ,Valor INTEGER ,Nota VARCHAR(255),Fecha DATE ,PRIMARY KEY(IdMovimiento))",[])

    .then((respuesta)=>{
      console.log("se creo correctamente la tabla TMOVIMIENTOS "+ this.insertRowsDetail.length  ); 

    }).catch(error =>{
      console.error("error al crear la tabla TMOVIMIENTOS "+JSON.stringify(error));
    });
  })

}

crear_t_subcategorias()
{
    return  new Promise((resolve,reject)=>{
      this.db.executeSql("CREATE TABLE IF NOT EXISTS TSUBCATEGORIAS (IdSubcategoria INTEGER  NOT NULL ,Descripcion VARCHAR(50), Categoria VARCHAR(20),Icono VARCHAR(50), PRIMARY KEY(IdSubcategoria))",[])
    .then((respuesta)=>{
      console.log("se creo correctamente la tabla TSUBCATEGORIAS");

          //***************************************segmento para insertar un registro********* */
          this.db.sqlBatch(this.insertSubcategorias).then((data)=>{                    
            console.log("se inserto correctamente los registros en la tabla TSUBCATEGORIAS");         
           
               resolve(data);
            },(error)=>{
            console.log("error al insertar en la tabla  TSUBCATEGORIAS"+ JSON.stringify(error));                  
            reject(error);
          });
          //************************************************************************************ */

    }).catch(error =>{
      console.error("error al crear la tabla TSUBCATEGORIAS "+JSON.stringify(error));
    });
  })

}

crear_t_categorias()
{
    return  new Promise((resolve,reject)=>{
      this.db.executeSql("CREATE TABLE TCATEGORIAS (IdCategoria INTEGER  NOT NULL , Descripcion VARCHAR(20),PRIMARY KEY(IdCategoria))",[])
    .then((respuesta)=>{
      console.log("se creo correctamente la tabla TCATEGORIAS");

          //***************************************segmento para insertar un registro********* */
          this.db.sqlBatch(this.insertCategorias).then((data)=>{                    
            console.log("se inserto correctamente los registros en la tabla TCATEGORIAS");         
           
               resolve(data);
            },(error)=>{
            console.log("error al insertar en la tabla  TCATEGORIAS"+ JSON.stringify(error));                  
            reject(error);
          });
          //************************************************************************************ */

    }).catch(error =>{
      console.error("error al crear la tabla TCATEGORIAS "+JSON.stringify(error));
    });
  })

}


}
