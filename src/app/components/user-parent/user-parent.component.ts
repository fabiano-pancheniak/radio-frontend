import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-user-parent',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './user-parent.component.html',
  styleUrl: './user-parent.component.scss'
})
export class UserParentComponent {

}
