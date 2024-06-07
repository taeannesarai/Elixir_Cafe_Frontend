import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit{
 isLoginOption: boolean = true; // used to decide whether to display login form or sign up form
  userId: number | undefined;

  eml: string = '';
  pw: string = '';
  pw_confirm: string = '';

  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    private router: Router
  ) {}
  isLoginError: boolean = false;
  loginErrorMessage: string = '';

  ngOnInit(): void {}

  authSubmit(formData: NgForm) {
    if (this.isLoginOption) {
      // login a user
      console.log(`AFTERLOGIN >> ${JSON.stringify(formData.value)}`);
      this.authService.login(formData.value).subscribe({
        next: (res) => {
          
          this.authService.authToken = res['data']['token'];
          this.authService.saveAuthToken();
          this.authService.getCurrUser(() => {
            this.authService.loginState = true;
            console.log('FROM LOGIN COMPONENT --- ', this.authService.loginState);
            this.userId = 123;
            this.authService.login(this.userId);
          });

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1000,
          });

          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000);
        },
        error: (error) => {
          console.log(`ERROR >> ${error.error.message}`);
          
          this.authService.loginState = false;
          if (error && error.error) {
            this.isLoginError = true;
            if (error.error.status == 'INVALID_EMAIL') {
              this.loginErrorMessage = 'User does not exists.';
            } else if (error.error.status == 'INVALID_PASSWORD') {
              this.loginErrorMessage = 'Incorrect password.';
            } else {
              this.loginErrorMessage =
                'Failed to login. Please try again later.';
            }

            setTimeout(() => (this.isLoginError = false), 5000);
          }
        },
      });
    } else {
      // sign up user
      formData.value.img = '';
      console.log(formData.value);

      this.authService.signUp(formData.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/');
        },
        error: (error) => {},
      });
    }
    formData.resetForm();
  }

  senRegMail(data: any) {
    this.emailService.sendRegistrationEmail(data).subscribe({
      next: (res) => {
        console.log("Email response: ",res);
      },
      error: (error) => {
        console.log("Email error response: ", error);
      },
    });
  }
}
