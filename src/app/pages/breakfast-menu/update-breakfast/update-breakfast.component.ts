import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
@Component({
  selector: 'app-update-breakfast',
  templateUrl: './update-breakfast.component.html',
  styleUrls: ['./update-breakfast.component.css'],
})
export class UpdateBreakfastComponent implements OnInit {
  bId: any; // id for select breakfast - from url
  breakfast: any; ///used to store breakfast data to be edited
  image: any;

  constructor(
    private breakfastMenuService: BreakfastMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bId = params['bId'];
    });

    this.getBreakfastData();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  //Get Breakfast item data
  getBreakfastData() {
    this.breakfastMenuService.getOneBreakfast(this.bId).subscribe((res) => {
      if (res['status'] == 'error') {
      } else {
        this.breakfast = res['data'];
        console.log('bressssss', res);
      }
    });
  }

  updateBreakfast(data: NgForm) {
    // console.log('formdata', data.value);
    this.image ? '' : (data.value.img = this.breakfast.image);

    console.log('form data: ', data.value);
    
    this.breakfastMenuService.updateBreakfast(data.value, this.bId, this.image).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error.error);
          Swal.fire({
            icon: 'error',
            title: 'opps...',
            text: 'Failed to apply changes to breakfast item!',
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Changes applied to breakfast successfully.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl('/view-breakfast/' + this.bId);
          });
        },
      });
  }
}
