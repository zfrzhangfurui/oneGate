import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, of, combineLatest, Observable } from 'rxjs';
import { tap, switchMap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from '../../../core/model/user/user.detail.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.less']
})
export class UserDetailPage implements OnInit {
  moment = moment;
  status: number;
  param$ = this.route.paramMap.pipe(
    switchMap(params => {
      let uid = +params.get('uid');
      return this.http.get<any>(`/user/get_user_detail?u=${uid}`)
    }), tap(data => {
      this.status = data.state.user_status;
    })
  )

  backToList() {
    this.router.navigate(['../../userlist'], { relativeTo: this.route });
  }
  // param$ = of('123');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.param$.subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
