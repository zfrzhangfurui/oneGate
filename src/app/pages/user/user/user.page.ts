import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, fromEvent, Subject, of, Observable } from 'rxjs';
import { switchMap, tap, throttleTime, pluck } from 'rxjs/operators';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData, UserList, UserRequest, TableConfig } from '../../../core/model/user/user.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.less']
})
export class UserPage implements OnInit {
  moment = moment;
  total = 0;
  tableLoadingToggle = false;
  tableConfig: TableConfig = {
    pageIndex: 1,
    pageSize: 2
  }
  resetTable = function (pageIndex, pageSize) {
    this.tableConfig.pageIndex = pageIndex;
    this.tableConfig.pageSize = pageSize;
  }
  onQueryParamsChange(event) {
    let { pageSize, pageIndex } = event;
    this.tableConfig.pageSize = pageSize;
    this.tableConfig.pageIndex = pageIndex;
    this.tableConfigSubject$.next(this.tableConfig);
  }
  tableConfigSubject$: Subject<TableConfig> = new Subject();
  /************************************************************************/

  tableData$ = this.tableConfigSubject$.pipe(switchMap(
    data => {
      //data.pageIndex--;
      let req = {
        ...data,
        pageIndex: data.pageIndex - 1
      }
      let start = '1970/01/01', end = moment(Date()).format('YYYY/MM/DD');
      let form = this.form.value;


      let reqForm = {
        nickname: form.nickname === null ? '' : form.nickname,
        id: form.id === null || form.id === '' ? 0 : form.id,
        start_time: form.start_time !== null ? moment(form.start_time).format('YYYY/MM/DD') : start,
        end_time: form.end_time !== null ? moment(this.form.value.end_time).format('YYYY/MM/DD') : end
      }
      console.log(reqForm);
      return this.http.get<UserData>(`/user/get_user_list?u=${reqForm.id}&n=${reqForm.nickname}&st=${reqForm.start_time}&et=${reqForm.end_time}&p=${req.pageIndex}&s=${req.pageSize}`).pipe(tap(data => {
        this.total = data.count;
      }), pluck('list'));
    }
  ))
  form: FormGroup = this.fb.group({
    id: new FormControl(null),
    nickname: new FormControl(null),
    start_time: new FormControl(null),
    end_time: new FormControl(null),
  })

  search() {
    this.resetTable(1, 2);
    this.tableConfigSubject$.next(
      this.tableConfig
    );
  }
  reset() {
    this.resetTable(1, 2);
    this.form.reset({
      id: null,
      nickname: null,
      start_time: null,
      end_time: null,
    });
    this.tableConfigSubject$.next(
      this.tableConfig
    );
  }
  navigateToDetail(uid) {
    this.router.navigate([uid], { relativeTo: this.route });
  }
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.form.value);
  }

}
