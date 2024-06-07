import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
@Component({
  selector: 'app-view-breakfast',
  templateUrl: './view-breakfast.component.html',
  styleUrls: ['./view-breakfast.component.css'],
})
export class ViewBreakfastComponent implements OnInit {
  constructor(
    private breakfastMenuService: BreakfastMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  breakfastItem: any;
  bId: any;
  hasData: boolean = false;

  loadData() {
    this.bId = this.route.snapshot.params['bId'];
    this.breakfastMenuService.getOneBreakfast(this.bId).subscribe((res) => {
      if (res['status'] !== 'error') {
        console.log('LOG BREAKFAST: ', res);
        this.breakfastItem = res['data'];
        this.hasData = true;
      } else {
        this.hasData = false;
      }
    });
  }
}
