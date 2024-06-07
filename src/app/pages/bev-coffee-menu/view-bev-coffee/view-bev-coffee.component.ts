import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BevCoffeeMenuService } from 'src/app/services/bev-coffee-menu.service';
@Component({
  selector: 'app-view-bev-coffee',
  templateUrl: './view-bev-coffee.component.html',
  styleUrls: ['./view-bev-coffee.component.css'],
})
export class ViewBevCoffeeComponent implements OnInit {
  constructor(
    private bevCoffeeMenuService: BevCoffeeMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  beverageItems: any;
  bcId: any;
  hasData: boolean = false;

  loadData() {
    this.bcId = this.route.snapshot.params['bcId'];
    this.bevCoffeeMenuService.getOneBeverage(this.bcId).subscribe((res) => {
      if (res['status'] !== 'error') {
        this.beverageItems = res['data'];
        this.hasData = true;
      } else {
        this.hasData = false;
      }
    });
  }
}
