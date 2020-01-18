import { Component, OnInit } from '@angular/core';
import { ModalController , NavParams } from '@ionic/angular';

// package para utilizar formularios
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PersistenciaService} from '../services/persistencia.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-form-ingresos',
  templateUrl: './form-ingresos.page.html',
  styleUrls: ['./form-ingresos.page.scss'],
})
export class FormIngresosPage implements OnInit {

  ingresosForm: FormGroup;
  catIngresos: any[]=[];
  listasSubcategorias:any[]=[];
  ListMovimientos: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public form: FormBuilder,
    public persistencia:PersistenciaService,
    public global:GlobalService
  ) {
    this.ingresosForm = this.form.group({
      valorIngreso: ['', [Validators.required, Validators.pattern(/^[0-9]{1,20}$/)]],
      subcategoria:   ['', Validators.required],
      notaIngreso:   ['', [Validators.pattern(/^[a-zA-z0-9 ]{1,20}$/)]],
      fechaMovimiento:   ['', Validators.required]
    });
/*
    this.catIngresos = [
      {name: 'Deposito', icon: 'stats'},
      {name: 'Sueldo', icon: ''},
      {name: 'Ahorros', icon: 'stats'},
      {name: 'Otro Ingreso', icon: ''}
    ];*/

    this.cargarListas();
    this.GetMovimientos();
  }

  GetMovimientos(){ 
    console.log("llamando el metodo GetMovimientos");
    this.persistencia.GetMovimientos()
    .then(lista_Movimientos => {
      console.log("Respuesta P"+lista_Movimientos);
      this.ListMovimientos = lista_Movimientos;
      console.log("entro al metodo GetMovimientos " );
    })
    .catch( error => {
      console.error( error );
    });    
  }

  async cargarInformacion()
  {
    await this.cargarListas();
  }

  async cargarListas()
  {
    await this.GetSubcategorias(1);
    //await this.GetCategorias();
  }

  async GetSubcategorias(tipo:any){
    await this.persistencia.GetSubcategorias(tipo)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listasSubcategorias = lista;     
        
    })
    .catch( error => {
      console.error( error );
    });
    }

  ngOnInit() {
  }

  async guardar() {
    let dataForm = {
      valor: this.ingresosForm.get('valorIngreso').value,
      subcategoria:  this.ingresosForm.get('subcategoria').value,
      nota:  this.ingresosForm.get('notaIngreso').value,
      fechaMovimiento:this.ingresosForm.get('fechaMovimiento').value,
      categoria:1
    }
    await  this.persistencia.guardarMovimiento(dataForm); 
       
    const onClosedData = dataForm;
    this.modalCtrl.dismiss(onClosedData);
  } 
/*
  async guardar() {
    let dataForm = {
      valorIngreso: this.ingresosForm.get('valorIngreso').value,
      categoria:  this.ingresosForm.get('categoria').value,
      notaIngreso:  this.ingresosForm.get('notaIngreso').value,
    }
    const onClosedData = dataForm;
    await this.modalCtrl.dismiss(onClosedData);
  } */

  // permite realizar acciones al cambiar de option(categoria)
  onChange(value) {
    console.log(value);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }


}
