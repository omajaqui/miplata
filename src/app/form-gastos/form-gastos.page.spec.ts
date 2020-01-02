import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormGastosPage } from './form-gastos.page';

describe('FormGastosPage', () => {
  let component: FormGastosPage;
  let fixture: ComponentFixture<FormGastosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGastosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
