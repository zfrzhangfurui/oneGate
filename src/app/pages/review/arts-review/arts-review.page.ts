import { Component, OnInit } from "@angular/core";
//import { ReviewDataService } from "../../data-service/review-data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap, tap, pluck, catchError, } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from "rxjs";
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
@Component({
  selector: "app-arts-review",
  templateUrl: "./arts-review.page.html",
  styleUrls: ["./arts-review.page.less"],
})
export class ArtsReviewPage implements OnInit {
  tablePageConfig: tableConfigModel = {
    p: 1,
    s: 20,
  }
  defaultTablePageConfig: tableConfigModel = {
    p: 1,
    s: 20
  }
  total = 1;

  form: FormGroup;
  currentMode: number = 0;
  modeStates: object = {
    0: {},
    1: {},
    2: {}
  };
  moment1: moment.Moment;
  momentUnix = moment;
  defaultConfig: navConfigModel = {
    w: null,
    n: '',
    un: '',
    st: null,
    et: null,
    t: -1,
    ta: -1,
    c: 0
  }
  tableConfig$: Subject<tableConfigModel> = new Subject();
  config$: BehaviorSubject<navConfigModel> = new BehaviorSubject(this.defaultConfig);
  tableData$ = combineLatest([
    this.config$, this.tableConfig$
  ]).pipe(
    //config传进去的是defaultConfig变量
    switchMap(([config, tableConfig]) => {
      let tableConfigClone = { ...tableConfig };
      let configClone = { ...config };
      let httpConfig: httpModel = Object.assign(configClone, tableConfigClone);
      httpConfig.p = httpConfig.p - 1;
      (httpConfig.w === null || httpConfig.w === '') ? httpConfig.w = '0' : true;
      httpConfig.st === null ? httpConfig.st = '1970/01/01' : httpConfig.st = moment(httpConfig.st).format('YYYY/MM/DD');
      httpConfig.et === null ? httpConfig.et = moment(Date()).format('YYYY/MM/DD') : httpConfig.et = moment(httpConfig.et).format('YYYY/MM/DD');

      return this.http.get<ArtsReviewModel>(
        `/work/get_work_list?w=${httpConfig.w}&p=${httpConfig.p}&s=${httpConfig.s}&n=${httpConfig.n}&un=${httpConfig.un}&st=${httpConfig.st}&et=${httpConfig.et}&t=${httpConfig.t}&ta=${httpConfig.ta}&ss=-1&c=${httpConfig.c}&m=0`
      ).pipe(tap(data => {
        console.log(data);
        this.total = data.count;
      }), pluck('list'));
    })
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute

  ) {
  }


  changeMode() {
    if (this.currentMode !== this.form.value.c) {
      this.modeStates[this.currentMode].form = { ...this.form.value };
      this.modeStates[this.currentMode].form.c = this.currentMode;
      this.currentMode = this.form.value.c;
      this.form.setValue(this.modeStates[this.currentMode].form);
      this.config$.next(this.form.value);
      this.tablePageConfig = this.modeStates[this.currentMode].table;
      this.tableConfig$.next(this.modeStates[this.currentMode].table);
      console.log(this.modeStates[this.currentMode].table);
    }
  }

  onSubmit() {
    this.config$.next(this.form.value);
    this.tablePageConfig = this.defaultTablePageConfig;
    this.tableConfig$.next(this.defaultTablePageConfig);
  }

  onReset() {
    let defaultConfig = { ... this.defaultConfig };
    delete defaultConfig.c;
    this.form.patchValue(defaultConfig);
    this.config$.next(this.form.value);
    this.tableConfig$.next(this.tablePageConfig);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    let { pageSize, pageIndex } = params;
    let pageInexClone = pageIndex;
    this.modeStates[this.currentMode].table = {
      p: pageInexClone, s: pageSize
    }
    console.log(this.modeStates[this.currentMode]);
    this.tableConfig$.next({ p: pageInexClone, s: pageSize });

  }
  inspectDetails(workid) {
    this.router.navigate(['arts-review', workid]);
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
    // this.http.get<ArtsReviewModel>(
    //   `/work/get_work_list?w=0&p=0&s=9999&n=&un=&st=1970/01/01&et=1970/01/01&t=-1&ta=-1&ss=-1&c=0&m=0`
    // ).subscribe(data => {
    //   console.log(data);
    // });

    for (let i in this.modeStates) {
      this.modeStates[i].form = { ...this.form.value }
      this.modeStates[i].form.c = i;
      this.modeStates[i].table = {
        p: 1,
        s: 20,
      }
    }
  }

}
