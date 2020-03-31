import { Component, Input, OnInit } from '@angular/core';
import { ModalController , NavParams,NavController } from '@ionic/angular';

// package para utilizar formularios
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersistenciaService} from '../services/persistencia.service';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.page.html',
  styleUrls: ['./form-gastos.page.scss'],
})
export class FormGastosPage implements OnInit {

  /*datos recivido utilizando Input */
   // Data passed in by componentProps
   @Input() paramID: number;
   @Input() paramTitle: string;

   gastosForm: FormGroup;
   catGastos: any[] = [];
   listasSubcategorias:any[]=[];
   ListMovimientos: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public form: FormBuilder,
    public persistencia:PersistenciaService,
    public navController:NavController
  ) {
    // datos recibidos por navparams
    console.log('datos recividos por navparams: ' + navParams.get('paramTitle'));
    this.gastosForm = this.form.group({
      valorGasto: ['', [Validators.required, Validators.pattern(/^[0-9]{1,20}$/)]],
      subcategoria:   ['', Validators.required],
      notaGasto:   ['', Validators.pattern(/^[a-zA-Z0-9 ]{1,50}$/)],
      fechaMovimiento:   ['', Validators.required]
    });
/*
    this.catGastos = [
      {name: 'Automóvil', icon: ''},
      {name: 'Factura', icon: ''},
      {name: 'Ropa', icon: ''},
      {name: 'Entretenimiento', icon: ''},
      {name: 'Comida', icon: ''},
      {name: 'Gasolina', icon: ''},
      {name: 'General', icon: ''},
      {name: 'Regalos', icon: ''},
      {name: 'Salud', icon: ''},
      {name: 'Vacaciones', icon: ''},
      {name: 'Hogar', icon: ''},
      {name: 'Niños', icon: ''},
      {name: 'Compras', icon: ''},
      {name: 'Deporte', icon: ''},
    ];*/
    this.cargarInformacion();
    this.GetMovimientos();
  }

  ngOnInit() {
    console.log(' datos recividos por input: ' + this.paramID);
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

async guardar() {
  let dataForm = {
    valor: this.gastosForm.get('valorGasto').value,
    subcategoria:  this.gastosForm.get('subcategoria').value,
    nota:  this.gastosForm.get('notaGasto').value,
    fechaMovimiento:this.gastosForm.get('fechaMovimiento').value,
    categoria:2
  }
  console.log("antes de guardar gastos");
  await  this.persistencia.guardarMovimiento(dataForm); 
  console.log("despues de guardar gastos");   
  const onClosedData = dataForm;
  this.modalCtrl.dismiss(onClosedData);
  //this.navController.navigateRoot(['/']);  
  //console.log("despues de guardar gastos");  
} 

/*
  async guardar() {
    let dataForm = {
      valorGasto: this.gastosForm.get('valorGasto').value,
      subcategoria:  this.gastosForm.get('subcategoria').value,
      notaGasto:  this.gastosForm.get('notaGasto').value,
    }
    const onClosedData = dataForm;
    await this.modalCtrl.dismiss(onClosedData);
  }*/
  
  // permite realizar acciones al cambiar de option(categoria)
  onChange(value) {
    console.log(value);
  }

  async cargarInformacion()
  {
    await this.cargarListas();
  }

  async cargarListas()
  {
    await this.GetSubcategorias(2);
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

  async closeModal() {
    await this.modalCtrl.dismiss(null);
  }

}
