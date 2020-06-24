import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { ReviewDataService } from "../../data-service/review-data.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ArtsReviewModel, navConfigModel, tableConfigModel, httpModel } from '../../../model/arts-review/review-list.model';
import { BehaviorSubject, Subject, of, from } from 'rxjs';
import { switchMap, tap, pluck, catchError } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { withLatestFrom, map } from "rxjs/operators";
import { Data } from './data';
const defaultTablePageConfig: tableConfigModel = {
  p: 1,
  s: 20
}
const defaultConfig: navConfigModel = {
  w: null,
  n: '',
  un: '',
  st: null,
  et: null,
  t: -1,
  ta: -1,
  c: 0
}

@Component({
  selector: "app-arts-review",
  templateUrl: "./arts-review.page.html",
  styleUrls: ["./arts-review.page.less"],
  providers: [{ provide: Data, useClass: Data }]
})
export class ArtsReviewPage implements OnInit, AfterViewInit {
  error: string;
  //this will be current page 
  tablePageConfig: tableConfigModel = {
    p: 1,
    s: 10,
  }
  tableLoadingToggle: boolean = false;
  total = 1;
  form: FormGroup;
  currentMode: number = 0;
  moment1: moment.Moment;
  momentUnix = moment;
  tableConfig$: BehaviorSubject<tableConfigModel> = new BehaviorSubject(this.tablePageConfig);
  config$: BehaviorSubject<navConfigModel> = new BehaviorSubject(defaultConfig);


  // tableData$ = of([1, 2, 3, 4, 5, 6, 7]);
  // tableData$ = this.tableConfig$.pipe(
  //   withLatestFrom(this.config$), switchMap(([tableConfig, config]) => {
  //     this.tableLoadingToggle = true;
  //     let tableConfigClone = { ...tableConfig };
  //     let configClone = { ...config };
  //     let httpConfig: httpModel = Object.assign(configClone, tableConfigClone);
  //     httpConfig.p = httpConfig.p - 1;
  //     (httpConfig.w === null || httpConfig.w === '') ? httpConfig.w = '0' : true;
  //     httpConfig.st === null ? httpConfig.st = '1970/01/01' : httpConfig.st = moment(httpConfig.st).format('YYYY/MM/DD');
  //     httpConfig.et === null ? httpConfig.et = moment(Date()).format('YYYY/MM/DD') : httpConfig.et = moment(httpConfig.et).format('YYYY/MM/DD');
  //     console.log(httpConfig);
  //     return this.http.get<ArtsReviewModel>(
  //       `/work/get_work_list?w=${httpConfig.w}&p=${httpConfig.p}&s=${httpConfig.s}&n=${httpConfig.n}&un=${httpConfig.un}&st=${httpConfig.st}&et=${httpConfig.et}&t=${httpConfig.t}&ta=${httpConfig.ta}&ss=-1&c=${httpConfig.c}&m=0`
  //     ).pipe(tap(data => {
  //       console.log(data);
  //       this.total = data.count;
  //       this.tableLoadingToggle = false;
  //     },

  //       error => {
  //         this.error = error.status;
  //         console.log(error);
  //       }), pluck('list'));

  //   })
  // )

  tableData$ = this.tableConfig$.pipe(
    withLatestFrom(this.config$), switchMap(([tableConfig, config]) => {
      this.tableLoadingToggle = true;
      let tableConfigClone = { ...tableConfig };
      let configClone = { ...config };
      let httpConfig: httpModel = Object.assign(configClone, tableConfigClone);
      httpConfig.p = httpConfig.p - 1;
      (httpConfig.w === null || httpConfig.w === '') ? httpConfig.w = '0' : true;
      httpConfig.st === null ? httpConfig.st = '1970/01/01' : httpConfig.st = moment(httpConfig.st).format('YYYY/MM/DD');
      httpConfig.et === null ? httpConfig.et = moment(Date()).format('YYYY/MM/DD') : httpConfig.et = moment(httpConfig.et).format('YYYY/MM/DD');
      console.log(httpConfig);
      return of(this.dataService.getData1()).
        pipe(tap(data => {
          console.log(data);
          this.total = data.count;
          this.tableLoadingToggle = false;
        },

          error => {
            this.error = error.status;
            console.log(error);
          }), pluck('list'));

    })
  )

  // tableData$ = this.tableConfig$.pipe(
  //   withLatestFrom(this.config$),
  //   switchMap(([tableConfig, config]) => {
  //     //return of([1, 2, 3, 4, 5]);
  //     throw new Error('500');
  //     return of(this.dataService.getData1()).pipe(pluck('list'), tap(data => {
  //       console.log(data);
  //     })
  //     );
  //   })
  // )


  // tableData$ = of([1, 2, 3, 4, 5]);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: Data
  ) {
  }

  changeMode(val: number) {
    if (this.currentMode !== +val) {
      console.log(this.tablePageConfig);
      this.currentMode = +val;
      let formAppend: navConfigModel = defaultConfig;
      formAppend.c = this.currentMode;
      this.form.setValue(formAppend);
      this.config$.next(this.form.value);
      //nzPageIndex is two way binding, so I dont have to launch tableConfig$ again once tablePageConfig.p is not 1
      if (this.tablePageConfig.p === 1) {
        this.tableConfig$.next(this.tablePageConfig);
      }
      this.tablePageConfig.p = defaultTablePageConfig.p;
    }
  }

  onSubmit() {
    this.config$.next(this.form.value);
    this.tablePageConfig.p = defaultTablePageConfig.p;
    this.tableConfig$.next(defaultTablePageConfig);
  }

  onReset() {
    let config = defaultConfig;
    delete config.c;
    this.form.patchValue(config);
    this.config$.next(this.form.value);
    this.tableConfig$.next(this.tablePageConfig);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    let { pageSize, pageIndex } = params;
    this.tableConfig$.next({ p: pageIndex, s: pageSize });
    console.log('sadfadsf');
  }

  inspectDetails(workid) {
    this.router.navigate([workid], { relativeTo: this.route });
  }
  download(fileRoute) {
    console.log(fileRoute);
    let j = document.createElement('a');
    j.href = fileRoute[0];
    j.setAttribute("download", 1 + '.jpg');
    console.log(j);
  }

  ngOnInit(): void {
    console.log('oninit');
    this.form = this.fb.group({
      w: [null],
      n: [''],
      un: [''],
      st: [null],
      et: [null],
      t: [-1],
      ta: [-1],
      c: [0]
    })
  }

  ngAfterViewInit() {
    // this.tableData$.subscribe(data => {

    // },
    //   err => {
    //     console.log(err);
    //   })
    // console.log('afterViewInit');
  }
}
