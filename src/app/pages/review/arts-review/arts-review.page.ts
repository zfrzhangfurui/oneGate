import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { ReviewDataService } from "../../data-service/review-data.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpEvent, HttpSentEvent } from '@angular/common/http';
import * as moment from 'moment';
import { ArtsReviewModel, navConfigModel, tableConfigModel, httpModel } from '../../../model/arts-review/review-list.model';
import { BehaviorSubject, Subject, of, from, Observable } from 'rxjs';
import { switchMap, tap, pluck, catchError } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { withLatestFrom, map } from "rxjs/operators";
import { Config } from 'protractor';
import { stringify } from 'querystring';
const defaultTablePageConfig: tableConfigModel = {
  p: 1,
  s: 5
}
const defaultConfig: navConfigModel = {
  w: null,
  n: '',
  un: '',
  st: null,
  et: null,
  t: -1,
  ta: -1,
}

@Component({
  selector: "app-arts-review",
  templateUrl: "./arts-review.page.html",
  styleUrls: ["./arts-review.page.less"],
  providers: []
})
export class ArtsReviewPage implements OnInit, AfterViewInit {
  /*error*/
  err: boolean = false;
  error: string;
  /*error*/
  mode: number = 0;
  //this will be current page 

  tablePageConfig: tableConfigModel = {
    p: 1,
    s: 5,
  }
  tableLoadingToggle: boolean = false;
  total = 1;
  form: FormGroup = this.fb.group({
    w: [null],
    n: [''],
    un: [''],
    st: [null],
    et: [null],
    t: [-1],
    ta: [-1],
  });
  currentMode: number = 0;
  moment1: moment.Moment;
  momentUnix = moment;
  tableConfig$: Subject<tableConfigModel> = new Subject();
  displayCounter(event) {
    console.log(event);
  }

  tableData$ = this.tableConfig$.pipe(
    switchMap((tableConfig) => {
      let mode = this.mode;
      this.err = false;
      this.tableLoadingToggle = true;
      let tableConfigClone = { ...tableConfig };
      let configClone: navConfigModel = { ...this.form.value };

      let httpParamConfig = function (config: navConfigModel, tableConfig: tableConfigModel): httpModel {
        let httpConfig: httpModel = Object.assign(config, tableConfig);
        httpConfig.p = httpConfig.p - 1;
        (httpConfig.w === null || httpConfig.w === '') ? httpConfig.w = '0' : true;
        httpConfig.st === null ? httpConfig.st = '1970/01/01' : httpConfig.st = moment(httpConfig.st).format('YYYY/MM/DD');
        httpConfig.et === null ? httpConfig.et = moment(Date()).format('YYYY/MM/DD') : httpConfig.et = moment(httpConfig.et).format('YYYY/MM/DD');
        return httpConfig;
      }
      let httpConfig: httpModel = httpParamConfig(configClone, tableConfigClone);
      let req: string;
      if (mode === 0) {
        req = `/work/get_apply_work_list?w=${httpConfig.w}&p=${httpConfig.p}&s=${httpConfig.s}&n=${httpConfig.n}&un=${httpConfig.un}&st=${httpConfig.st}&et=${httpConfig.et}&t=${httpConfig.t}`;
      } else if (mode === 1 || mode === 2) {
        req = `/work/get_audit_work_logs?w=${httpConfig.w}&p=${httpConfig.p}&s=${httpConfig.s}&n=${httpConfig.n}&un=${httpConfig.un}&st=${httpConfig.st}&et=${httpConfig.et}&t=${httpConfig.t}&a=${mode}`;
      }
      return this.http.get<ArtsReviewModel>(req).
        // return this.http.get<ArtsReviewModel>(onLaunchRequest(httpParamConfig, this.mode, tableConfigClone, configClone)).
        pipe(tap(data => {
          console.log(data);
          this.total = data.count;
          this.tableLoadingToggle = false;
        },
          error => {
            this.err = true;
            this.error = error.status;
            console.log(error);
          }), pluck('list'));

    })
  )

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  changeMode() {
    this.form.setValue(defaultConfig);
    this.tablePageConfig.p = defaultTablePageConfig.p;
    this.tablePageConfig.s = defaultTablePageConfig.s;
    this.tableConfig$.next(this.tablePageConfig);
  }

  onSubmit() {
    this.tablePageConfig.p = defaultTablePageConfig.p;
    this.tablePageConfig.s = defaultTablePageConfig.s;
    this.tableConfig$.next(this.tablePageConfig);
  }

  onReset() {
    this.form.setValue(defaultConfig);
    this.tablePageConfig.p = defaultTablePageConfig.p;
    this.tablePageConfig.s = defaultTablePageConfig.s;
    this.tableConfig$.next(this.tablePageConfig);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    let { pageSize, pageIndex } = params;
    console.log(pageSize, pageIndex);
    this.tableConfig$.next({ p: pageIndex, s: pageSize });
  }

  onInspectDetails(workid, submittype, version) {
    console.log(workid, submittype, version);
    if (typeof version === 'undefined') {
      version = 1;
    }

    this.router.navigate([workid, submittype, version, this.mode], { relativeTo: this.route });
  }
  download(fileRoute) {
    console.log(fileRoute);
    let j = document.createElement('a');
    j.href = fileRoute[0];
    j.setAttribute("download", 1 + '.jpg');
    console.log(j);
  }

  ngOnInit(): void { }

  ngAfterViewInit() { }
}
