import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { BevCoffeeMenuService } from 'src/app/services/bev-coffee-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
@Component({
  selector: 'app-update-bev-coffee',
  templateUrl: './update-bev-coffee.component.html',
  styleUrls: ['./update-bev-coffee.component.css'],
})
export class UpdateBevCoffeeComponent implements OnInit {
  bcId: any; // id for select breakfast - from url
  beverage: any; ///used to store breakfast data to be edited
  image: any;

  constructor(
    private bevCoffeeMenuService: BevCoffeeMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bcId = params['bcId'];
    });

    this.getBeverageData();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  //Get beverage item data
  getBeverageData() {
    this.bevCoffeeMenuService.getOneBeverage(this.bcId).subscribe((res) => {
      if (res['status'] == 'error') {
      } else {
        this.beverage = res['data'];
        console.log('sssss', res);
      }
    });
  }

  updateBeverage(data: NgForm) {
    // console.log('formdata', data.value);
    this.image ? '' : (data.value.img = this.beverage.image);

    console.log('form data: ', data.value);

    this.bevCoffeeMenuService.updateBeverage(data.value, this.bcId, this.image).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error.error);
          Swal.fire({
            icon: 'error',
            title: 'opps...',
            text: 'Failed to apply changes to beverage item!',
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Changes applied to beverage successfully.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl('/view-beverage/' + this.bcId);
          });
        },
      });
  }
}
