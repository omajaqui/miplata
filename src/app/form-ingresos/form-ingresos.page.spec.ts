import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormIngresosPage } from './form-ingresos.page';

describe('FormIngresosPage', () => {
  let component: FormIngresosPage;
  let fixture: ComponentFixture<FormIngresosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIngresosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormIngresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
