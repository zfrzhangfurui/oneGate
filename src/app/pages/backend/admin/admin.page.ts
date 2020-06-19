import { Component, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree'
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
/*****************************modal*********************************************/
export enum Modal {
  ModalDeleteRole = 'ModalDeleteRole',
  ModalAddRole = 'ModalAddRole',
  ModalEdit = 'ModalEdit',
  ModalEditPassword = 'ModalEditPassword',

}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.less']
})
export class AdminPage implements OnInit {
  adminSubject$ = new BehaviorSubject('init');
  tableData$ = this.adminSubject$.pipe(switchMap(data => {

    return of(
      [
        { id: 1, name: 'Furui', description: '123123123123123123' },
        { id: 2, name: '张三', description: '123123123123123123' },
        { id: 3, name: '李四', description: '123123123123123123' },
        { id: 4, name: '王五', description: '123123123123123123' }
      ]
    )
    // return this.http.get<>().........
  }))

  defaultCheckedKeys = ['0-0-0'];
  defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  /*****************************modal*********************************************/

  createComponentModal(modalType, content): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType);
    switch (modalType) {
      case Modal.ModalDeleteRole: title = '删除角色'; break;
      case Modal.ModalAddRole: title = '新增角色'; break;
      case Modal.ModalEdit: title = '删除用户'; break;
      case Modal.ModalEditPassword: title = '新增用户'; break;
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
      nzFooter: [
        {
          label: 'change component title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'title in inner component is changed';
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }



  /*****************************modal*********************************************/









  constructor(
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

}
