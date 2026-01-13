import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { enviorments } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}
  email = '';
  password = '';
  errorMessage = signal<string>('');

  login() {
    this.errorMessage.set('');
    this.http
      .post(`${enviorments.apiUrl}/auth/signin`, {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.auth.setToken(res.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.status === 404 || err.status === 400) {
            this.errorMessage.set('Invalid email or password');
          } else {
            this.errorMessage.set('somthing went wrong');
          }
        },
      });
  }
}
