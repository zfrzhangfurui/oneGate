import { Component, OnInit, OnDestroy, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, auditTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SingleWork, AuditList } from '../../../core/model/singleArt.model';
enum modalMode {
  modalAccept = 'modalAccept',
  modalDecline = 'modalDecline',
  modalCancelPublish = 'modalCancelPublish',
}
enum AuditType {
  auditAccepted = 'auditAccepted',
  auditDeclined = 'auditDeclined',
  auditPending = 'auditPending'
}

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.page.html',
  styleUrls: ['./review-detail.page.less']
})
export class ReviewDetailPage implements OnInit, OnDestroy {
  /********************modal*********************************************/
  isVisible: boolean = false;
  isModalLoading: boolean = false;
  modalTitle: string;
  modalMode: modalMode = null;
  @ViewChild('declineInput') declineInput: ElementRef;
  /********************modal*********************************************/
  auditType: AuditType;
  //unsubscribe
  routeSub;
  workid: number;
  artWorkInfo: SingleWork = {
    auditlist: [
      {
        username: 'Furui',
        audittime: '123213123123',
        check_state: 1,
        description: 'dsfdsfdsfdsfdsf'
      }
    ],
    baseinfo: {
      name: '',
      type: 0,
      state: 0,
      file: '',
      file_size: 0,
      updatetime: 0,
      copyright: 0,
      cover: '',
      tag: [],
      assets: [],
      author_id: 0,
      author_name: '',
      like_count: 0,
      collect_count: 0,
      share_count: 0,
      description: '',
      license: 0,
      price: '',
      attribute: 0,
      createtime: 0,
      publishtime: 0
    }
  }



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }



  updateReviewstatus(auditList: AuditList) {

    if (auditList.auditlist.length > 0) {
      for (let i of auditList.auditlist) {
        if (i.check_state === 1) {
          this.auditType = AuditType.auditAccepted; return;
        }
      }
      this.auditType = AuditType.auditDeclined;
    } else {
      this.auditType = AuditType.auditPending; return;
    }
  }

  /********************modal*********************************************/
  showAuditModal(event) {
    this.modalMode = event;
    this.isVisible = true;
    switch (event) {
      case 'modalAccept': this.modalTitle = '审核通过'; break;
      case 'modalDecline': this.modalTitle = '审核拒绝'; break;
      // case 'modalAccept': this.modalTitle = '审核通过';break;
    }
  }
  handleCancel() {
    this.isVisible = false;

  }
  handleOk() {
    this.isModalLoading = true;
    let auditResult: number;
    let auditMessage: string;
    switch (this.modalMode) {
      case modalMode.modalAccept: auditResult = 1; auditMessage = ''; break;
      case modalMode.modalDecline: auditResult = 2; auditMessage = this.declineInput.nativeElement.value; break;
    }
    this.http.post<any>('/work/audit_work', { w: this.workid, s: auditResult, d: auditMessage }).pipe(switchMap(_ => {
      return this.http.get<SingleWork>(`/work/get_work?w=${(this.workid)}`)
    })).subscribe(data => {
      this.updatePage(data);
      console.log(this.artWorkInfo);
      console.log(this.auditType);
      this.isModalLoading = false;
      this.isVisible = false;
    })
  }

  updatePage(data) {
    this.artWorkInfo = data;
    this.updateReviewstatus(this.artWorkInfo);
  }
  backTolist() {
    this.router.navigate(['arts-review']);
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.pipe(
      switchMap(params => {
        this.workid = +params.get('workid');
        return this.http.get<SingleWork>(`/work/get_work?w=${+params.get('workid')}`)
      })
    ).subscribe(data => {
      this.updatePage(data);
      console.log(this.artWorkInfo);
      console.log(this.auditType);
    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
