import { Component, inject } from '@angular/core';
import { DeferirService } from '../../services/deferir.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deferir',
  standalone: true,
  imports: [NgFor],
  providers: [{provide: DeferirService}],
  templateUrl: './deferir.component.html',
  styleUrl: './deferir.component.scss'
})
export class DeferirComponent {
  constructor(private router: Router){
    this.getOrdensServico()
  }
  deferirService = inject(DeferirService)
  ordensServicoList: any = []

  getOrdensServico(){
    this.deferirService.getOrdensServico().subscribe({
      next: (value) => { 
        this.ordensServicoList = value
        console.log(this.ordensServicoList)
       }
    }) 
  }
  
  getOrdemServicoDetails(e: any) {
    this.router.navigate([`/ordem-servico/${e.target.id}`])
  }
}
