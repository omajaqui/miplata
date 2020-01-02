import { Component, Input, OnInit } from '@angular/core';
import { ModalController , NavParams } from '@ionic/angular';

// package para utilizar formularios
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public form: FormBuilder,
  ) {
    // datos recibidos por navparams
    console.log('datos recividos por navparams: ' + navParams.get('paramTitle'));
    this.gastosForm = this.form.group({
      valorGasto: ['', [Validators.required, Validators.pattern(/^[0-9]{1,20}$/)]],
      categoria:   ['', Validators.required],
      notaGasto:   ['', Validators.pattern(/^[a-zA-Z0-9 ]{1,50}$/)],
    });

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
    ];
  }

  ngOnInit() {
    console.log(' datos recividos por input: ' + this.paramID);
  }

  async guardar() {
    let dataForm = {
      valorGasto: this.gastosForm.get('valorGasto').value,
      categoria:  this.gastosForm.get('categoria').value,
      notaGasto:  this.gastosForm.get('notaGasto').value,
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
