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
}
