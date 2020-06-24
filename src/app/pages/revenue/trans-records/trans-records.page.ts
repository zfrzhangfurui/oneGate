import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../model/revenue/order-list.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-trans-records',
  templateUrl: './trans-records.page.html',
  styleUrls: ['./trans-records.page.less']
})
export class TransRecordsPage implements OnInit {
  type;
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
  // tableData$ = this.route.params.pipe(switchMap(params => {
  tableData$ = this.tableConfig$.pipe(tableConfig => {
    let type = 'product';
    let i;
    switch (type) {
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
    return i;
  })
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
