import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-arts-review',
  templateUrl: './arts-review.page.html',
  styleUrls: ['./arts-review.page.less']
})
export class ArtsReviewPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(123);
    this.http.get<any>(
      `/work/get_work_list?w=0&p=0&s=9999&n=&un=&st=1970/01/01&et=1970/1/1&t=-1&ta=-1&ss=-1&c=1&m=0`
    ).subscribe(data => {
      console.log(data);
    })
  }

}
