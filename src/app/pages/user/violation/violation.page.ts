import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableConfig } from '../../../model/user/user.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-violation',
  templateUrl: './violation.page.html',
  styleUrls: ['./violation.page.less']
})
export class ViolationPage implements OnInit {
  moment = moment;
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
    tableConfig
    //return this.http.get()
    return of([
      { uid: 1, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 2, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 3, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 4, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 5, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 6, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 7, nickname: 'furui', registertime: '2000/01/01' },
      { uid: 8, nickname: 'furui', registertime: '2000/01/01' },
    ])
  }))

  navigateToDetail(uid) {
    console.log(uid);
    this.router.navigate(['../goods-detail', uid], { relativeTo: this.route })
  }
  search() { }
  reset() { }
  onQueryParamsChange(event) { }



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
