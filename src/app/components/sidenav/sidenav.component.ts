import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  providers: [{provide: AuthService}],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() items: any = [];
  constructor(private router: Router){ console.log(this.items)}
  authService = inject(AuthService)
  profileUpdated: boolean = true

  logout(){
    localStorage.removeItem('access-token')
    this.router.navigate(['auth/login'])
  }
}
