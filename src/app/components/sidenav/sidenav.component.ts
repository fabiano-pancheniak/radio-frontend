import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  constructor(private router: Router){}
  logout(){
    localStorage.removeItem('access-token')
    this.router.navigate(['auth/login'])
  }
}
