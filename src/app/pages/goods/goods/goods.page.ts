import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableConfig } from '../../../core/model/goods.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-goods',
  templateUrl: './goods.page.html',
  styleUrls: ['./goods.page.less']
})
export class GoodsPage implements OnInit, AfterViewInit {
  mode: string;
  type: string;
  onInitTitle(a) {
    switch (a) {
      case 'product': this.type = '已发布作品'; break;
      case 'deleteArts': this.type = '已删除作品'; break;
      case 'onStage': this.type = '已上架作品'; break;
      case 'forSale': this.type = '已出售作品'; break;
      case 'deleteGoods': this.type = '已删除作品'; break;
      default: {
        this.type = ''; break;
      }
    }
  }
  moment = moment;
  tableConfig: TableConfig = {
    pageIndex: 1,
    pageSize: 2
  }
  tableLoadingToggle: boolean = false;
  total: number = 0;
  form: FormGroup = this.fb.group({
    1: new FormControl(),
    2: new FormControl(),
    3: new FormControl(),
    4: new FormControl(),
    5: new FormControl(),
    6: new FormControl(),
    7: new FormControl(),

  })
  tableData$ = this.route.params.pipe(switchMap(params => {
    setTimeout(() => {
      this.onInitTitle(params.type)
    }, 100, this)
    //this.onInitTitle(params.type);
    let i: Observable<Array<{}>>;
    switch (params.type) {
      case 'product':
        i = of([
          {
            uid: 1,
            nickname: 'product',
            registertime: '2020/01/01'
          },
          {
            uid: 2,
            nickname: 'product',
            registertime: '2020/01/01'
          },
        ])

          ; break;
      case 'deleteArts':
        i = of([
          {
            uid: 1,
            nickname: 'deleteArts',
            registertime: '2020/01/01'
          },
          {
            uid: 2,
            nickname: 'deleteArts',
            registertime: '2020/01/01'
          },
        ])
          ; break;
      case 'onStage':
        i = of([
          {
            uid: 1,
            nickname: 'onStage',
            registertime: '2020/01/01'
          },
          {
            uid: 2,
            nickname: 'onStage',
            registertime: '2020/01/01'
          },
        ]); break;
      case 'forSale':
        i = of([
          {
            uid: 1,
            nickname: 'forSale',
            registertime: '2020/01/01'
          },
          {
            uid: 2,
            nickname: 'forSale',
            registertime: '2020/01/01'
          },
        ]); break;
      case 'deleteGoods':
        i = of([
          {
            uid: 1,
            nickname: 'deleteGoods',
            registertime: '2020/01/01'
          },
          {
            uid: 2,
            nickname: 'deleteGoods',
            registertime: '2020/01/01'
          },
        ]); break;

    }

    // return this.http.get(`/work/get_work_list?w=0&p=0&s=999&n=&un=&st=1970/01/01&et=2020/06/20&t=1&ta=0&ss=-1&c=-1&m=0`).pipe(tap(data => {
    //   console.log(data);
    // }));
    return i;
  }))
  config$ = new Subject();


  navigateToDetail(uid) {
    console.log(uid);


    this.router.navigate(['../goods-detail', uid], { relativeTo: this.route })
  }
  search() { }
  reset() { }
  onQueryParamsChange(event) { }



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    console.log('onInit');
  }
  ngAfterViewInit() {
  }

}
