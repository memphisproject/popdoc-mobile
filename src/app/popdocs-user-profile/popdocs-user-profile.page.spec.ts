import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { PopdocsUserProfilePage } from './popdocs-user-profile.page';

describe('PopdocsUserProfilePage', () => {
  let component: PopdocsUserProfilePage;
  let fixture: ComponentFixture<PopdocsUserProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdocsUserProfilePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopdocsUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
