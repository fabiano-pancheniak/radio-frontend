import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf],
  providers: [{provide: AuthService}],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  constructor(private router: Router){
    this.isUserProfileUpdated()
  }
  authService = inject(AuthService)
  profileUpdated: boolean = true

  isUserProfileUpdated(){
    this.authService.getUserData(localStorage.getItem('access-token')).subscribe(res => {
      this.profileUpdated = res.updatedProfile
    })
  } 

  logout(){
    localStorage.removeItem('access-token')
    this.router.navigate(['auth/login'])
  }
}
