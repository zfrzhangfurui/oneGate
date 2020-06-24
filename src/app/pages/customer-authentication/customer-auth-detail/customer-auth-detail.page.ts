import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, of, combineLatest, Observable } from 'rxjs';
import { tap, switchMap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerAuthDetail, Modal } from '../../../model/customer-auth-detail.model';
import * as moment from 'moment';
enum AuthType {
  authAccept = 'authAccept',
  authDecline = 'authDecline',
  authPending = 'authPending'
}
@Component({
  selector: 'app-customer-auth-detail',
  templateUrl: './customer-auth-detail.page.html',
  styleUrls: ['./customer-auth-detail.page.less']
})
export class CustomerAuthDetailPage implements OnInit {
  /****************************modal attribute declare**********************************/
  modal: Modal = {
    modalToggle: false,
    modalAuthType: AuthType.authDecline,
    authTitle: '审核通过'
  };
  modalSubject$: BehaviorSubject<string[]> = new BehaviorSubject(['init']);
  /**************************************************************/
  @ViewChild('declineInput') declineInput: ElementRef;
  moment = moment;
  uid: number;
  content$ = combineLatest([this.modalSubject$, this.route.paramMap], function (modalSubject, paramMap) {
    if (modalSubject[0] === 'init') {
      console.log('init');
      return [false, +paramMap.get('uid')];
    } else if (modalSubject[0] === 'confirm' || modalSubject[0] === 'decline') {
      // let result: boolean;
      // modalSubject[0] === 'confirm' ? result = true : result = false;
      // return this.http.post('/real/examine', { uid: this.uid, result: result, remarks: modalSubject[1] }).pipe(pluck('uid'))
      return [true, modalSubject]
    }
  }).pipe(
    switchMap(data => {
      if (data[0]) {
        let result: boolean;
        data[1][0] === 'confirm' ? result = true : result = false;
        console.log('result: ', data[1]);
        return this.http.post('/real/examine', { uid: this.uid, result: result, remarks: data[1][1] })
      } else {
        return of(data[1]);
      }
    }),
    switchMap(data => {
      let http;
      if (data === null) {
        http = this.http.get<CustomerAuthDetail>(`/real/info?uid=${this.uid}`).pipe(tap(data => {
          this.uid = data.uid;
          console.log(data.result);
        }));
      } else {
        http = this.http.get<CustomerAuthDetail>(`/real/info?uid=${data}`).pipe(tap(data => {
          this.uid = data.uid;
          console.log(data.result);
        }));
      }
      return http.pipe(
        tap(_ => {
          this.modal.modalToggle = false;
        })
      );
    })
  )

  backToList() {
    this.router.navigate(['../../customer-auth'], { relativeTo: this.route });
  }

  showModal(event) {
    console.log(event);
    switch (event) {
      case 'modalAccept':
        this.modal.modalToggle = true;
        this.modal.authTitle = '审核通过';
        this.modal.modalAuthType = AuthType.authAccept; break;
      case 'modalDecline':
        this.modal.modalToggle = true;
        this.modal.authTitle = '审核拒绝';
        this.modal.modalAuthType = AuthType.authDecline; break;
      // case 'modalReconsider': this.modal = modalPending; break;
    }
    console.log(this.modal);
  }
  handleCancel() {
    console.log(123);
    this.modal.modalToggle = false;
    console.log(this.modal);
  }
  handleConfirm(event) {
    if (event === 'confirm') {
      this.modalSubject$.next(['confirm', ''])
    } else if (event === 'decline') {
      this.modalSubject$.next(['decline', this.declineInput.nativeElement.value]);
    }

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // console.log(this.customerAuthType);
  }

}
