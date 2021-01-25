import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { PopdocsTilePage } from './popdocs-tile.page';

describe('PopdocsTilePage', () => {
  let component: PopdocsTilePage;
  let fixture: ComponentFixture<PopdocsTilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdocsTilePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopdocsTilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
