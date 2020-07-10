import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableConfig, TableData } from '../../../model/goods.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { switchMap, tap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { tableConfig } from 'src/app/model/customer-auth.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
@Component({
  selector: 'app-goods-published',
  templateUrl: './goods-published.page.html',
  styleUrls: ['./goods-published.page.less']
})
export class GoodsPublishedPage implements OnInit, AfterViewInit {
  mode: string;
  type: string;
  onInitTitle(a) {
    switch (a) {
      case 'publishedGoods': this.type = '已发布作品'; break;
      case 'deletedGoods': this.type = '已删除作品'; break;
      default: {
        this.type = ''; break;
      }
    }
  }
  moment = moment;
  tableConfig: TableConfig = {
    pageIndex: 1,
    pageSize: 20
  }
  tableConfig$: BehaviorSubject<TableConfig> = new BehaviorSubject(this.tableConfig);
  tableLoadingToggle: boolean = false;
  total: number = 0;
  form: FormGroup = this.fb.group({
    goodsID: new FormControl(null),
    goodsName: new FormControl(''),
    publishUser: new FormControl(''),
    timeStartFrom: new FormControl(null),
    timeEndWith: new FormControl(null),
    goodsCategory: new FormControl(-1),
    withSellableGoods: new FormControl(-1),

  })
  tableData$ = this.tableConfig$.pipe(
    withLatestFrom(this.route.params, (tableConfig, params) => {
      return [tableConfig, params]
    }), switchMap(([tableConfig, params]) => {
      let type;
      let form = { ...this.form.value };
      form.goodsID === '' || form.goodsID === null ? form.goodsID = 0 : 123;
      form.timeStartFrom === null ? form.timeStartFrom = '1970/01/01' : form.timeStartFrom = moment(form.timeStartFrom).format('YYYY/MM/DD');
      form.timeEndWith === null ? form.timeEndWith = moment(Date()).format('YYYY/MM/DD') : form.timeEndWith = moment(form.timeEndWith).format('YYYY/MM/DD');
      console.log(form.goodsID);
      let pageIndex = tableConfig.pageIndex - 1;
      let pageSize = tableConfig.pageSize;
      let URL = `/work/get_work_list?w=${form.goodsID}&p=${pageIndex}&s=${pageSize}&n=${form.goodsName}&un=${form.publishUser}&st=${form.timeStartFrom}&et=${form.timeEndWith}&t=${form.goodsCategory}&m=0&ws=${form.withSellableGoods}`
      let onGoingRequest = (URL) => {
        return this.http.get<TableData>(`/work/get_work_list?w=${form.goodsID}&p=${pageIndex}&s=${pageSize}&n=${form.goodsName}&un=${form.publishUser}&st=${form.timeStartFrom}&et=${form.timeEndWith}&t=${form.goodsCategory}&m=0&ws=${form.withSellableGoods}`);
      }
      return onGoingRequest(URL)
    }), shareReplay()
  )

  navigateToDetail(workid) {
    console.log(workid);
    this.router.navigate(['../goods-detail', workid], { relativeTo: this.route })
  }
  search() {
    console.log(123);
    this.tableConfig$.next({ pageIndex: 1, pageSize: 1 });
  }
  reset() {
    this.tableConfig$.next({ pageIndex: 1, pageSize: 20 });
  }


  onQueryParamsChange(params: NzTableQueryParams): void {
    let { pageSize, pageIndex } = params;
    console.log(pageSize, pageIndex);
    this.tableConfig$.next({ pageIndex: pageIndex, pageSize: pageSize });
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    console.log('onInit');
    this.tableData$.subscribe(data => {
      this.total = data.count;
      console.log(data);
    })
  }
  ngAfterViewInit() {
  }

}
