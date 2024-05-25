import { Component } from '@angular/core';
import { OrdemServicoService } from '../../services/ordem-servico/ordem-servico.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-minhas-solicitacoes',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatTableModule],
  templateUrl: './minhas-solicitacoes.component.html',
  styleUrl: './minhas-solicitacoes.component.scss'
})
export class MinhasSolicitacoesComponent {
  constructor(
    private ordemServicoService: OrdemServicoService,
    private authService: AuthService,
    private router: Router)
  {
    this.getOrdemServicoByUser()
  }

  ordemServicoList$ = new Observable<any[]>();
  token = localStorage.getItem('access-token')
  userId = this.authService.getUserId(this.token)  
  displayedColumns: string[] = ['id', 'Data criação', 'Deferido', 'Subtotal'];


  getOrdemServicoByUser(){
    this.ordemServicoList$ = this.ordemServicoService.getOrdemServicoByUser(this.userId)
  }

  getOrdemServicoDetails(e: any) {
    this.router.navigate([`minhas-solicitacoes/${e.target.id}`])
  }
}
