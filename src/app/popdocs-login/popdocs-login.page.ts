import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as  AuthActions from './store/auth.actions';

@Component({
  selector: 'app-popdocs-login',
  templateUrl: './popdocs-login.page.html',
  styleUrls: ['./popdocs-login.page.scss'],
})
export class PopdocsLoginPage implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>,
    private routerOutlet: IonRouterOutlet
  ) {
    this.routerOutlet.swipeGesture = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select('auth').subscribe( authState => {
      this.isLoading = authState.loading;
      if (authState.authError) {
        this.errorMessage = authState.authError;
      }
    });
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.LoginStart({
       email: this.loginForm.controls.email.value,
       password: this.loginForm.controls.password.value
    }));
  }
}
