import { Component, OnInit } from '@angular/core';
import {PersistenciaService} from '../services/persistencia.service';
import { ModalController } from '@ionic/angular';

//import pagina para cargar como modal
import { DetailGastosPage } from '../pages/detail-gastos/detail-gastos.page';

// importo service
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  today: any;
  subCatGastos: any[] = [];
  listaGastos:any[]=[];

  constructor(
    public persistencia:PersistenciaService,    
    public modalCtrl: ModalController,
    public util: UtilService,
    ) {
    /* this.subCatGastos = [ 
      {Descripcion:"Automóvil",  Valor:"2", Icono:'car', IdSubcategoria: '1'},
      {Descripcion:'Factura', Valor:'180000', Icono:'paper', IdSubcategoria: '2'},
      {Descripcion:'Ropa', Valor:'300000', Icono:'shirt', IdSubcategoria: '3'},
      {Descripcion:'Entretenimiento', Valor:'80000', Icono:'reverse-camera', IdSubcategoria: '4'},
      {Descripcion:'Venecas', Valor:'250000', Icono:'woman', IdSubcategoria: '5'},
      {Descripcion:'Comida', Valor:'250000', Icono:'restaurant', IdSubcategoria: '6'},
      {Descripcion:'Gasolina', Valor:'120000', Icono:'speedometer', IdSubcategoria: '7'},
      {Descripcion:'General', Valor:'80000', Icono:'checkbox-outline', IdSubcategoria: '8'},
      {Descripcion:'Regalos', Valor:'90000', Icono:'cube', IdSubcategoria: '9'},
      {Descripcion:'Salud', Valor:'450000', Icono:'medkit', IdSubcategoria: '10'},
      {Descripcion:'Vacaciones', Valor:'2400000', Icono:'paper-plane', IdSubcategoria: '11'},
      {Descripcion:'Hogar', Valor:'650000', Icono:'home', IdSubcategoria: '12'}, //me salto el 12+1 que es de mala suerte
      {Descripcion:'Niños', Valor:'200000', Icono:'sad', IdSubcategoria: '14'},
      {Descripcion:'Otros', Valor:'120000', Icono:'sync', IdSubcategoria: '15'},      
    ];
 */
    this.today = this.util.fechaActual();
  }

  ngOnInit() {    
  }

  ionViewWillEnter()
  {
    this.cargarListas();
    console.log("Entro a clase tab1 ionViewWillEnter");
  }
 
  async cargarListas()
  {
    console.log("entro a metodo cargarListas");
    await this.Ingresos('2020-01-06');
    //await this.GetCategorias();
  }

  async Ingresos(fecha:any){
    await this.persistencia.ListarMovimientos(fecha,2)
    .then(lista => {
      //console.log(lista_Catalogos);    
      this.listaGastos = lista;     
        
    })
    .catch( error => {
      console.error( error );
    });
  }

  // este metodo crea un modal y le envia parametro
  async viewDetail(idSub, descripcion, icono) {
    const modalDetail = await this.modalCtrl.create({
      component: DetailGastosPage,
      componentProps: { // envia parametros al modal
        'IdSubcategoria': idSub,
        'Descripcion': descripcion,
        'Icono': icono,
      } 
    });
    return await modalDetail.present();
  }


}
