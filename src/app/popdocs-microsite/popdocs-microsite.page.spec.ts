import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopdocsMicrositePage } from './popdocs-microsite.page';

describe('PopdocsMicrositePage', () => {
  let component: PopdocsMicrositePage;
  let fixture: ComponentFixture<PopdocsMicrositePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdocsMicrositePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopdocsMicrositePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
