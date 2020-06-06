import { Component, OnInit } from "@angular/core";

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from '@ngxs/store';
import { UserState } from '../../../core/state/user.state';
import { Login } from '../../../core/state/user.action';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less']
})
export class LoginPage implements OnInit {
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private loginDataService: LoginDataService,
    private router: Router,
    private http: HttpClient,
    private store: Store
  ) { }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.store.dispatch(new Login(this.validateForm.value.a, this.validateForm.value.p)).subscribe(
        success => {

          this.router.navigate(['/arts-review']);
        }, e => {
          console.log(e);
          // if (e instanceof IvoryError) {
          //   let errors: {
          //     wrong_password?: boolean,
          //     user_not_exist?: boolean
          //   } = {};
          //   switch (e.code) {
          //     case 101:
          //       errors.user_not_exist = true;
          //       break;
          //     case 102:
          //       errors.wrong_password = true;
          //       break;
          //   }
          //   this.accountError$.next(errors);
          //   this.account?.setErrors(errors);
          //   this.cdr.markForCheck();
          //   this.account?.markAsTouched();
          //   // this.account?.updateValueAndValidity();
        }
      )



    };

    // this.store.dispatch(new UserLogin({ id: 112233 }));
    // Server is returning a status requiring the client to try something else.

    // catchError((err) => {
    //   // Network or other error, handle appropriately
    //   console.error(err);
    //   return of({ error: true, message: err.message });
    // })
  }


  // a: "18888888888,86",
  // p: "112233",
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      a: [null, [Validators.required]],
      p: [null, [Validators.required]],
    });
  }
}

