import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailIngresosPage } from './detail-ingresos.page';

describe('DetailIngresosPage', () => {
  let component: DetailIngresosPage;
  let fixture: ComponentFixture<DetailIngresosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailIngresosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailIngresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
