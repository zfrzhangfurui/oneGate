import { Component, OnInit } from "@angular/core";
//import { ReviewDataService } from "../../data-service/review-data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap, pluck, catchError } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { withLatestFrom, map } from "rxjs/operators";
interface ArtsReviewModel {
  count: number,
  list: []
}
interface navConfigModel {
  w: string,
  n: string,
  un: string,
  st: string,
  et: string,
  t: number,
  ta: number,
  c: number
}
//p:页码，s:页大小
interface tableConfigModel {
  p: number,
  s: number,
}

interface httpModel {
  w: string,
  n: string,
  un: string,
  st: string,
  et: string,
  t: number,
  ta: number,
  p: number,
  s: number,
  c: number
}

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
})
export class ArtsReviewPage implements OnInit {
  //this will be current page 
  tablePageConfig: tableConfigModel = {
    p: 1,
    s: 20,
  }
  total = 1;
  form: FormGroup;
  currentMode: number = 0;
  moment1: moment.Moment;
  momentUnix = moment;
  tableConfig$: Subject<tableConfigModel> = new Subject();
  config$: BehaviorSubject<navConfigModel> = new BehaviorSubject(defaultConfig);

  tableData$ = this.tableConfig$.pipe(
    withLatestFrom(this.config$), switchMap(([tableConfig, config]) => {
      let tableConfigClone = { ...tableConfig };
      let configClone = { ...config };
      let httpConfig: httpModel = Object.assign(configClone, tableConfigClone);
      httpConfig.p = httpConfig.p - 1;
      (httpConfig.w === null || httpConfig.w === '') ? httpConfig.w = '0' : true;
      httpConfig.st === null ? httpConfig.st = '1970/01/01' : httpConfig.st = moment(httpConfig.st).format('YYYY/MM/DD');
      httpConfig.et === null ? httpConfig.et = moment(Date()).format('YYYY/MM/DD') : httpConfig.et = moment(httpConfig.et).format('YYYY/MM/DD');
      console.log(httpConfig);
      return this.http.get<ArtsReviewModel>(
        `/work/get_work_list?w=${httpConfig.w}&p=${httpConfig.p}&s=${httpConfig.s}&n=${httpConfig.n}&un=${httpConfig.un}&st=${httpConfig.st}&et=${httpConfig.et}&t=${httpConfig.t}&ta=${httpConfig.ta}&ss=-1&c=${httpConfig.c}&m=0`
      ).pipe(tap(data => {
        console.log(data);
        this.total = data.count;
      }), pluck('list'));
    })
  )

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
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
  }

  inspectDetails(workid) {
    this.router.navigate([workid], { relativeTo: this.route });
  }

  ngOnInit(): void {
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
}
