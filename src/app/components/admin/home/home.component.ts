import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router){ }
  logout(){
    localStorage.removeItem('access-token')
    this.router.navigate(['auth/login'])
  }
}
