import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BevCoffeeMenuService } from 'src/app/services/bev-coffee-menu.service';
@Component({
  selector: 'app-add-bev-coffee',
  templateUrl: './add-bev-coffee.component.html',
  styleUrls: ['./add-bev-coffee.component.css'],
})
export class AddBevCoffeeComponent implements OnInit {
  imageForm: any;
  image: any;

  constructor(private bevCoffeeMenuService: BevCoffeeMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

onFileChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
}
  
 createBeverage(beverage: NgForm) {
    this.image
    console.log('form data: ', beverage.value);
    
    this.bevCoffeeMenuService.createBeverage(beverage.value, this.image).subscribe({
      next: (res) => {
        console.log('new beverage: ', res);
        
      }, 
      error: (error) => {
        console.log('new beverage error: ', error.error);
        
      }, 
      complete: () => {
        this.router.navigateByUrl('/beverages')
      }
    })
  }
}

