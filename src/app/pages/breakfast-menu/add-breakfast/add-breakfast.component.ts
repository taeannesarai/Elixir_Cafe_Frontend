import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-breakfast',
  templateUrl: './add-breakfast.component.html',
  styleUrls: ['./add-breakfast.component.css']
})
export class AddBreakfastComponent implements OnInit {
  imageForm: any;
  image: any;

  constructor(private breakfastMenuService: BreakfastMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  createBreakfast(breakfast: NgForm) {
    this.image
    console.log('form data: ', breakfast.value);
    
    this.breakfastMenuService.createBreakfast(breakfast.value, this.image).subscribe({
      next: (res) => {
        console.log('new breakfast: ', res);
        
      }, 
      error: (error) => {
        console.log('new breakfast error: ', error.error);
        
      }, 
      complete: () => {
        this.router.navigateByUrl('/breakfast')
      }
    })
  }
  
}
