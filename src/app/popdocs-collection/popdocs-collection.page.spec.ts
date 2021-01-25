import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { PopdocsCollectionPage } from './popdocs-collection.page';

describe('PopdocsCollectionPage', () => {
  let component: PopdocsCollectionPage;
  let fixture: ComponentFixture<PopdocsCollectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdocsCollectionPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        provideMockStore({})
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopdocsCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
