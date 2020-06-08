import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, auditTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { SingleWork, AuditList } from '../../../core/model/singleArt.model';
import { Observable } from 'rxjs';
enum modalMode {
  modalAccept = 'modalAccept',
  modalDecline = 'modalDecline',
  modalCancelPublish = 'modalCancelPublish',
  modalResult = 'modalResult',
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
export class ReviewDetailPage implements OnInit {
  /********************modal*********************************************/
  isVisible: boolean = false;
  isModalLoading: boolean = false;
  modalTitle: string;
  modalMode: modalMode = null;
  requestExecuteStatus: { success, fail } = {
    success: true,
    fail: false
  };
  errorMessage: string;
  @ViewChild('declineInput') declineInput: ElementRef;
  /********************modal*********************************************/
  auditType: AuditType;
  workid: number;
  moment = moment;
  //type	integer/文件类型 0:Live2D 1:原画
  //state: 0:仅展示 1:未出售 2:已售出
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

  routeSub = this.route.paramMap.pipe(
    switchMap(params => {
      this.workid = +params.get('workid');
      return this.http.get<SingleWork>(`/work/get_work?w=${+params.get('workid')}`)
    })
  )

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }



  updateReviewstatus(auditList: AuditList) {
    console.log(auditList);
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
    this.requestExecuteStatus = {
      success: false,
      fail: false
    };
    console.log(event);
    switch (event) {
      case 'modalAccept': this.modalTitle = '审核通过'; break;
      case 'modalDecline': this.modalTitle = '审核拒绝'; break;
      // case 'modalAccept': this.modalTitle = '审核通过';break;
    }
  }
  //modal requestExecuteResult
  requestExecuteResult(event) {
    if (event === 'auditSuccess') {
      this.modalMode = modalMode.modalResult;
      this.requestExecuteStatus = {
        success: true,
        fail: false
      };
      this.isModalLoading = false;
      setTimeout(() => {
        this.isVisible = false;
      }, 2000)
    } else {
      this.modalMode = modalMode.modalResult;
      this.isModalLoading = false;
      this.requestExecuteStatus = {
        success: false,
        fail: true
      };
      console.log(this.requestExecuteResult);
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
    this.http.post<any>('/work/audit_work', { w: this.workid, c: auditResult, d: auditMessage }).pipe(switchMap(_ => {
      return this.http.get<SingleWork>(`/work/get_work?w=${(this.workid)}`)
    })).subscribe(data => {
      this.updatePage(data);
      console.log(this.artWorkInfo);
      console.log(this.auditType);
      this.requestExecuteResult('auditSuccess');
    }, err => {
      this.requestExecuteResult('123')
      this.errorMessage = err;
    })

  }

  updatePage(data) {
    this.artWorkInfo = data;
    this.updateReviewstatus(this.artWorkInfo);
    //this.updateImages(this.artWorkInfo.baseinfo.assets);
  }
  // updateImages(images) {
  //   return new Observable<string[]>((observer) => {
  //     const { next, error } = observer;
  //     next(images);
  //   })
  // }
  backTolist() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.routeSub.subscribe(data => {
      this.updatePage(data);
      console.log(this.artWorkInfo);
      console.log(this.auditType);
    })
  }
}
