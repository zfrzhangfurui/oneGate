import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerList, RequestList, tableConfig, CustomerAuthForm } from '../../../model/customer-auth.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, fromEvent, Subject, of, Observable } from 'rxjs';
import { withLatestFrom, switchMap, tap, throttleTime, pluck } from 'rxjs/operators';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
const defaultFormConfig: CustomerAuthForm = {
  uid: null,
  name: null,
  applyStartTime: null,
  applyEndTime: null,
  verifyStartTime: null,
  verifyEndTime: null
}

@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.page.html',
  styleUrls: ['./customer-auth.page.less']
})
export class CustomerAuthPage implements OnInit {
  moment = moment;
  tableLoadingToggle = false;
  total = 0;
  pageIndex = 1;
  pageSize = 5;
  form: FormGroup = this.fb.group({
    uid: new FormControl(null),
    name: new FormControl(null),
    applyStartTime: new FormControl(null),
    applyEndTime: new FormControl(null),
    verifyStartTime: new FormControl(null),
    verifyEndTime: new FormControl(null)
  })
  tableConfig$: Subject<tableConfig> = new Subject();
  tableData$: Observable<CustomerList[]> = this.tableConfig$.pipe(
    switchMap((tableConfig: tableConfig) => {
      let form = this.form.value;
      let controls = this.form.controls;
      console.log(form);
      let applyStartTime, applyEndTime, verifyStartTime, verifyEndTime;
      form.applyStartTime === null || controls.applyStartTime.disabled ? applyStartTime = '1970/01/01' : applyStartTime = moment(form.applyStartTime).format('YYYY/MM/DD');
      form.applyEndTime === null || controls.applyEndTime.disabled ? applyEndTime = moment(Date()).format('YYYY/MM/DD') : applyEndTime = moment(form.applyEndTime).format('YYYY/MM/DD');

      form.verifyStartTime === null || controls.verifyStartTime.disabled ? verifyStartTime = '1970/01/01' : verifyStartTime = moment(form.verifyStartTime).format('YYYY/MM/DD');
      form.verifyEndTime === null || controls.verifyEndTime.disabled ? verifyEndTime = moment(Date()).format('YYYY/MM/DD') : verifyEndTime = moment(form.verifyEndTime).format('YYYY/MM/DD');
      form.uid === null || controls.uid.disabled ? form.uid = '' : console.log(form.uid);
      form.name === null || controls.name.disabled ? form.name = '' : console.log(form.name);
      const req = {
        ...form,
        applyStartTime: applyStartTime,
        applyEndTime: applyEndTime,
        verifyStartTime: verifyStartTime,
        verifyEndTime: verifyEndTime
      }
      tableConfig.p--;
      console.log(req);

      return this.http.get<RequestList>(`/real/list?t=${this.authType}&uid=${req.uid}&name=${req.name}&s=${tableConfig.s}&p=${tableConfig.p}&st=${req.applyStartTime}&et=${req.applyEndTime}&est=${req.verifyStartTime}&eet=${req.verifyEndTime}`).pipe(
        tap(data => {
          this.tableLoadingToggle = false;
          this.total = data.count;
          console.log(this.total);
        }), pluck('list')
      );
    }))

  authType: number = 1;

  test() {
    this.pageIndex = 1;
    this.pageSize = 5;
    this.tableLoadingToggle = true;
    this.tableConfig$.next({ p: this.pageIndex, s: this.pageSize });
  }

  inputDisabledStrategy(event) {
    let controls = this.form.controls;
    const setInput = (event) => {
      if (event === 'date') {
        controls.uid.disable();
        controls.name.disable();
      } else if (event === 'uid') {
        for (let i in controls) {
          if (i !== 'uid') {
            controls[i].disable();
          }
        }
      } else if (event === 'name') {
        for (let i in controls) {
          if (i !== 'name') {
            controls[i].disable();
          }
        }
      }
    }
    if (event === 'uid') {
      if (this.form.controls.uid.value !== null && this.form.controls.uid.value !== '') {
        setInput(event);
      } else {
        this.form.enable();
      }
    }
    if (event === 'name') {
      if (this.form.controls.name.value !== null && this.form.controls.name.value !== '') {
        setInput(event);
      } else {
        this.form.enable();
      }
    }
    if (event === 'date') {
      if (
        controls.applyStartTime !== null &&
        controls.applyEndTime !== null &&
        controls.verifyStartTime !== null &&
        controls.verifyEndTime !== null
      ) {
        setInput(event);
      } else {
        this.form.enable();
      }
    }
  }

  inspectDetails(uid) {
    this.router.navigate([uid], { relativeTo: this.route });
  }

  onQueryParamsChange(event) {
    const { pageIndex, pageSize } = event;
    this.tableLoadingToggle = true;
    this.tableConfig$.next({ p: pageIndex, s: pageSize });
    console.log(event);
  }
  changeAuthTypeAndReset() {
    this.form.setValue(defaultFormConfig);
    this.form.enable();
    console.log(this.form.value);
    this.pageIndex = 1;
    this.pageSize = 5;
    this.tableLoadingToggle = true;
    this.tableConfig$.next({ p: this.pageIndex, s: this.pageSize });
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
}
