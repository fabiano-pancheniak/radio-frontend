import { Component} from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { OrdemServicoService } from '../../../services/ordem-servico/ordem-servico.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-deferir',
  standalone: true,
  imports: [NgFor, MatTableModule],
  templateUrl: './deferir.component.html',
  styleUrl: './deferir.component.scss'
})
export class DeferirComponent{
  constructor(private router: Router, private ordemServicoService: OrdemServicoService, private authService: AuthService){
    this.getOrdensServico()
  }
  ordensServicoList: any = []
  displayedColumns: string[] = ['id', 'Email', 'Data criação', 'Deferido', 'Subtotal'];


  getOrdensServico(){
    const userId = this.authService.getUserId(localStorage.getItem('access-token'))
    this.ordemServicoService.getOrdemServico(userId).subscribe({
      next: (value) => { 
        this.ordensServicoList = value
        console.log(this.ordensServicoList)
       }
    }) 
  }
  
  getOrdemServicoDetails(e: any) {
    this.authService.isAdmin().subscribe(res => {
      if(res){
        this.router.navigate([`admin/deferir/${e.target.id}`])
        return
      }  
      this.router.navigate([`minhas-solicitacoes/${e.target.id}`])
    })
  }

  convertToBRL(value: String){
    return `R$ ${value},00`
  }

}
