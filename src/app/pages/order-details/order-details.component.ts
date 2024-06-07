import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetail: any;
  odId: any;
  hasData: boolean = false;

  constructor(
    private orderDetailsService: OrderDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.viewOrderDetail();
  }

  viewOrderDetail() {
    this.odId = this.route.snapshot.params['odId'];
    this.orderDetailsService.viewOrderDetails(this.odId).subscribe((res) => {
      if (res['status'] === 'success') {
        console.log(`ORDER DETAILS DATA >> ${JSON.stringify(res['data'])}`);
        console.log(`ORDER DETAILS DATA ORDERD >> ${JSON.stringify(res['data']!['orderd'])}`);
        this.orderDetail = res['data']!['orderd'][0];
        this.hasData = true;
      } else {
        this.hasData = false;
      }
    });
  }
}
