import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, of, combineLatest } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerAuthDetail, Modal } from '../../../core/model/customer-auth-detail.model';
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
  modalSubject$ = new BehaviorSubject('123');
  /**************************************************************/
  customerAuthType: AuthType = AuthType.authPending;
  // content$ = combineLatest([this.modalSubject$, this.route.paramMap], function (modalSubject, paramMap) {
  //   return +paramMap.get('uid');
  // }).pipe(
  //   switchMap(data => {
  //     console.log(data);
  //     return this.http.get<CustomerAuthDetail>(`/real/info?uid=${data}`);
  //   })
  // )

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
      case 'modalPending':
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log(this.customerAuthType);
    // this.content$.subscribe(data => {
    //   console.log(data);
    // });
  }

}
