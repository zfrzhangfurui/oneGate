import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.page.html',
  styleUrls: ['./goods-detail.page.less']
})
export class GoodsDetailPage implements OnInit {



  onBackListPage() {
    this.router.navigate(['../../goods-published'], { relativeTo: this.route });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
