import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{provide: AuthService}, {provide: Router}],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (loginResponse) => {
        this.handleLoginResponse(loginResponse);
      }
    });
  }
  
  handleLoginResponse(loginResponse: any) {
    const { token } = loginResponse;
    localStorage.setItem('access-token', token);
    
    this.authService.getUserData(token).subscribe({
      next: (userData) => {
        this.redirectBasedOnRole(userData.role);
      }
    });
  }
  
  redirectBasedOnRole(role: any) {
    const isAdmin = role === 'ADMIN';
    const destination = isAdmin ? ['admin/deferir'] : ['home'];
    this.router.navigate(destination);
  }

}
