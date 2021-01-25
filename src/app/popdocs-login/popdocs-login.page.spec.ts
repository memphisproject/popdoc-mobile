import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { PopdocsLoginPage } from './popdocs-login.page';

describe('PopdocsLoginPage', () => {
  let component: PopdocsLoginPage;
  let fixture: ComponentFixture<PopdocsLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdocsLoginPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PopdocsLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
