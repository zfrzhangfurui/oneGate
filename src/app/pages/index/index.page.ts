import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.less']
})
export class IndexPage implements OnInit {
  isCollapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
