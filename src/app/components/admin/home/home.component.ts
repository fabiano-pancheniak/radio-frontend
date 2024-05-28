import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { SidenavComponent } from '../../sidenav/sidenav.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  menuItems: any = [
    {description: 'Cadastro serviço', link: 'servico'}
  ]
  constructor(private router: Router){ }
  logout(){
    localStorage.removeItem('access-token')
    this.router.navigate(['auth/login'])
  }
}
