import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovsComponent } from './movs.component';

describe('MovsComponent', () => {
  let component: MovsComponent;
  let fixture: ComponentFixture<MovsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
