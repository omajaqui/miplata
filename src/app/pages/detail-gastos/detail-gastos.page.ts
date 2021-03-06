import { Component, Input, OnInit } from '@angular/core';
import { ModalController , NavParams } from '@ionic/angular';

// servicios 
import {PersistenciaService} from '../../services/persistencia.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-detail-gastos',
  templateUrl: './detail-gastos.page.html',
  styleUrls: ['./detail-gastos.page.scss'],
})
export class DetailGastosPage implements OnInit {

  /*datos recivido utilizando Input */
  // Data passed in by componentProps from modalCtrl
  @Input() IdSubcategoria: number;
  @Input() Descripcion: string;

  // variables donde recibo parametros al abrir el modal
  descrip: string;
  iconoCategoria: string;
  listaDetailGastos:any[]=[];
  subcategoria:string; 

  detalleSubCategoria: any[]=[];
  today: any;
  today1 = new Date();
  fecha:any;
  
  
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public persistencia:PersistenciaService,
    public util: UtilService,
  ) { 
    // datos recibidos por navparams
    this.descrip = navParams.get('Descripcion');
    this.iconoCategoria = navParams.get('Icono');  
     this.subcategoria = navParams.get('IdSubcategoria');     
    console.log('id subcategoria: ' + 
                    navParams.get('IdSubcategoria')+ 
                    ', Descripcion: ' + this.descrip +
                    ', icono: ' + this.iconoCategoria);
     
    this.detalleSubCategoria = [
      {fecha:'2020-01-06', valor:'130000', nota:'gasto numero 1'},
      {fecha:'2020-01-08', valor:'85000', nota:'gasto numero 2'},
      {fecha:'2020-01-12', valor:'23500', nota:'gasto numero 3'},
      {fecha:'2020-01-31', valor:'42890', nota:'gasto numero 4'},
    ];

    this.today = this.util.fechaActual();
  }

  ngOnInit() {
  }
  
  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  ionViewWillEnter()
  {
    this.cargarGastos();
    console.log("Entro a clase tab1 ionViewWillEnter");
  }

  async cargarGastos()
  {
    this.fecha =this.today1.getFullYear() + '-' + ('0' + (this.today1.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today1.getDate()).slice(-2);
    await this.Gastos(this.fecha);
  }

  async Gastos(fecha:any){
    await this.persistencia.ListarDetalleMovimientos(fecha,this.subcategoria)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listaDetailGastos = lista;          
    })
    .catch( error => {
      console.error( error );
    });
    }

}
