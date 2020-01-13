import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailGastosPage } from './detail-gastos.page';

describe('DetailGastosPage', () => {
  let component: DetailGastosPage;
  let fixture: ComponentFixture<DetailGastosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGastosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
