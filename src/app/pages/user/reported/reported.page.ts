import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableConfig, Config } from '../../../core/model/user/reported.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
@Component({
  selector: 'app-reported',
  templateUrl: './reported.page.html',
  styleUrls: ['./reported.page.less']
})
export class ReportedPage implements OnInit {
  moment = moment;
  // config:
  mode: number = 0;
  // config$: BehaviorSubject<Config> = new BehaviorSubject();
  tableConfig: TableConfig = {
    pageIndex: 1,
    pageSize: 2
  }
  tableConfig$: BehaviorSubject<TableConfig> = new BehaviorSubject(this.tableConfig);
  tableLoadingToggle: boolean = false;
  total: number = 0;
  form: FormGroup = this.fb.group({
    1: new FormControl,
    2: new FormControl,
    3: new FormControl,
    4: new FormControl,
    5: new FormControl,
    6: new FormControl,
    7: new FormControl,

  })

  tableData$ = this.tableConfig$.pipe(switchMap(tableConfig => {
    console.log('sdfdsf');
    console.log(tableConfig, ' qwe    ' + this.mode);
    // return this.http.get('');
    return of(
      [
        { uid: 1, nickname: 'dsfdsf', registertime: '2000/01/01' },
        { uid: 2, nickname: 'dsfdsf', registertime: '2000/01/01' },
        { uid: 3, nickname: 'dsfdsf', registertime: '2000/01/01' },
        { uid: 4, nickname: 'dsfdsf', registertime: '2000/01/01' },
      ]
    )
  }))
  // tableData$ = of([
  //   1, 2, 3, 4, 5, 6, 7
  // ])

  navigateToDetail(uid) {
    console.log(uid);
    this.router.navigate(['../reportlist', uid], { relativeTo: this.route })
  }
  search() { }
  reset() { }
  onQueryParamsChange(event) { }
  changeMode() {
    this.tableConfig$.next({ pageIndex: 1, pageSize: 2 });
  }



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.tableData$.subscribe();
    // console.log(123);
    // this.tableConfig$.next({
    //   pageSize: 1,
    //   pageIndex: 2
    // })
  }

}
