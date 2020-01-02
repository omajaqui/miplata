import { Component, OnInit } from '@angular/core';
import { ModalController , NavParams } from '@ionic/angular';

// package para utilizar formularios
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-ingresos',
  templateUrl: './form-ingresos.page.html',
  styleUrls: ['./form-ingresos.page.scss'],
})
export class FormIngresosPage implements OnInit {

  ingresosForm: FormGroup;
  catIngresos: any[]=[];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public form: FormBuilder,
  ) {
    this.ingresosForm = this.form.group({
      valorIngreso: ['', [Validators.required, Validators.pattern(/^[0-9]{1,20}$/)]],
      categoria:   ['', Validators.required],
      notaIngreso:   ['', [Validators.pattern(/^[a-zA-z0-9 ]{1,20}$/)]],
    });

    this.catIngresos = [
      {name: 'Deposito', icon: 'stats'},
      {name: 'Sueldo', icon: ''},
      {name: 'Ahorros', icon: 'stats'},
      {name: 'Otro Ingreso', icon: ''}
    ];
  }

  ngOnInit() {
  }

  async guardar() {
    let dataForm = {
      valorIngreso: this.ingresosForm.get('valorIngreso').value,
      categoria:  this.ingresosForm.get('categoria').value,
      notaIngreso:  this.ingresosForm.get('notaIngreso').value,
    }
    const onClosedData = dataForm;
    await this.modalCtrl.dismiss(onClosedData);
  } 

  // permite realizar acciones al cambiar de option(categoria)
  onChange(value) {
    console.log(value);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }


}
