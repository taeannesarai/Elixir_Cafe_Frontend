import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userSubscription!: Subscription;
  
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  user: any;
  isLoggedIn?: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('IS USER LOGGED IN? ----', this.isLoggedIn);
    this.authService.getCurrUser(() => {
      this.user = this.authService.currUser
    }); 
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
    console.log('USER DATA ----', this.user);

  }
  

  logoutUser() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = undefined;
    this.router.navigateByUrl('/login-signup');
  }


}

