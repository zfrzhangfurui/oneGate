import { Component, OnInit } from "@angular/core";
// import { LoginDataService } from "../data-service/login-data.service";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private loginDataService: LoginDataService,
    private router: Router
  ) { }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      // this.loginDataService.login(this.validateForm.value).subscribe({
      //   //next: (result) => console.log(result),
      //   error: (error) => console.log(error),
      //   complete: () => {
      //     console.log("done");
      //     this.router.navigate(["/index"]);
      //   },
      // });
    }
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
