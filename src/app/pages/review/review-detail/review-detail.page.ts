import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, auditTime, combineAll, withLatestFrom, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { SingleWork, ContentChangeRouteList, SingleWorkGoods, CooperationInfo, Modal } from '../../../model/arts-review/singleArt.model';
import { Observable, combineLatest, forkJoin, of, BehaviorSubject } from 'rxjs';
import { ModalPage } from '../review-modal/modal.page';
import { NzModalService } from 'ng-zorro-antd/modal';
enum modalMode {
  modalAccept = 'modalAccept',
  modalDecline = 'modalDecline',
  modalCancelPublish = 'modalCancelPublish',
  modalResult = 'modalResult',
}

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.page.html',
  styleUrls: ['./review-detail.page.less']
})
export class ReviewDetailPage implements OnInit {
  /********************modal*********************************************/
  @ViewChild('declineInput') declineInput: ElementRef;
  /********************modal*********************************************/

  moment = moment;
  //type	integer/文件类型 0:Live2D 1:原画
  //state: 0:仅展示 1:未出售 2:已售出

  requestSwitch: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userInfo$ = this.requestSwitch.pipe(withLatestFrom(this.route.paramMap), switchMap(([requestSwitch, params]) => {
    let workid = +params.get('workid');
    let version = +params.get('version');
    let mode = +params.get('mode');
    let submittype = +params.get('submittype');
    let URL1: string = null;
    let URL2: string = null;
    let URL3: string = `/work/get_cooperation_info?w=${workid}`;
    console.log(workid);
    console.log(version);
    console.log(mode);
    switch (mode) {
      case 0: URL1 = `/work/get_apply_work?w=${workid}`; break;
      case 1: URL1 = `/work/get_audit_work_version?w=${workid}&v=${version}`; break;
      case 2: URL1 = `/work/get_audit_work_version?w=${workid}&v=${version}`; break;
    }
    if (submittype === 1) {
      switch (mode) {
        case 0: URL2 = `/work/get_work?w=${workid}`; break;
        case 1: URL2 = `/work/get_audit_work_version?w=${workid}&v=${version - 1}`; break;
        case 2: URL2 = `/work/get_audit_work_version?w=${workid}&v=${Math.floor(version)}`; break;
      }
    }

    let outGoingRequest = (URL) => {
      return this.http.get<SingleWork>(URL);
    }
    /*******合作**************/
    let outGoingCooperateRequest = (URL) => {
      return this.http.get<CooperationInfo>(URL);
    }
    let req: Observable<[SingleWork, SingleWork, CooperationInfo, number, number]>;
    console.log(URL1, URL2, URL3);
    if (URL2 !== null) {
      req = forkJoin(outGoingRequest(URL1), outGoingRequest(URL2), outGoingCooperateRequest(URL3), of(workid), of(mode));
    } else {
      console.log('只有一个输出URL');
      req = forkJoin(outGoingRequest(URL1), outGoingRequest(URL1), outGoingCooperateRequest(URL3), of(workid), of(mode));
    }
    return req;
  }),
    switchMap(([work1, work2, coopwork, workid, mode]) => {
      console.log({ ...work1 });
      console.log({ ...work2 });
      //false是不同 true 相同； splitView : false 不需要分页  true 需要
      //id, name, maxstock, price
      let splitView = false;
      let changeLog: ContentChangeRouteList = {
        name: false,
        category: false,
        file: false,
        file_size: false,
        copyright: false,
        tag: false,
        auditstate: false,
        author_id: false,
        author_name: false,
        description: false,
        assets: [],
        goods: []
      }
      /***********************goodsProcessFunction*******************************************************/
      let goodsProcessFunction = (arr1, arr2) => {
        let length = arr2.length;
        for (let i = 0; i < length; i++) {
          if (typeof arr1[i] !== 'undefined') {
            //toggle variable remain true if-for loop didn't match any result 

            let changeLogGoodsArray: Array<boolean> = [];
            for (let j in arr2[i]) {
              if (arr2[i][j] !== arr1[i][j]) {
                if (j !== 'file') {
                  console.log('this is false: ' + j);
                  changeLogGoodsArray.push(false);
                  splitView = true;
                }
              } else {
                if (j !== 'file') {
                  console.log(j);
                  changeLogGoodsArray.push(true);
                }
              }
            }
            changeLog.goods.push(changeLogGoodsArray);

          } else {
            changeLog.goods.push([false, false, false, false]);
            splitView = true;
          }
        }
      }
      /******************************************************************************/

      for (let attr in changeLog) {
        if (Array.isArray(work1[attr]) && Array.isArray(work2[attr])) {
          if (attr === 'goods') {
            goodsProcessFunction(work1[attr], work2[attr])
          }
        } else {
          if (work1[attr] === work2[attr]) {
            changeLog[attr] = true;
            // console.log('dao zhe la');
          } else {
            if (attr !== 'time') {
              changeLog[attr] = false;
              splitView = true;
            }
          }
        }
      }
      /******************************format tag************************************************/
      work1.tagArray = work1.tag.split(',');
      work2.tagArray = work2.tag.split(',');
      /******************************modal***********************************************/
      let modalToggle;
      if (splitView) {
        modalToggle = work2.auditstate;
      } else {
        modalToggle = work1.auditstate;
      }
      /******************************download***********************************************/
      // work1.file_size = work1.file_size/1000/1000

      return of({
        work1,
        work2,
        changeLog,
        workid,
        splitView,
        coopwork,
        modalToggle
      })
    }), shareReplay())

  /*****************************modal*********************************************/

  createComponentModal(modalType, content): void {
    console.log(modalType, content);
    let title;
    modalType = modalType as Modal;
    console.log(modalType);
    switch (modalType) {
      case Modal.auditAccepted: title = '审核通过'; break;
      case Modal.auditDeclined: title = '审核拒绝'; break;
      case Modal.cancelPublish: title = '审核拒绝'; break;
    }
    const modal = this.modal.create({
      // nzTitle: title,
      nzContent: ModalPage,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        modalSwitch: modalType,
        content: content,
        title: title,
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzClosable: false,
      nzMaskClosable: false
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      this.requestSwitch.next(true);
    });
  }



  /*****************************modal*********************************************/




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  backTolist() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.userInfo$.subscribe(data => {
      console.log(data);
    })
  }
}
