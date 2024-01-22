import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}
 //Check if user is in user database
  login() {
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/login', this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dash-board2']);
      },
      (error) => {
        if (error.status === 401) {
          if (error.error.error === 'User not found') {
            this.errorMessage = 'User not found';
          } else if (error.error.error === 'Invalid credentials') {
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          this.errorMessage = 'Internal Server Error';
        }
      }
    );
  }
}
