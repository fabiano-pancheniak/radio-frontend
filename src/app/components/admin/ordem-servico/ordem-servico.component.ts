import { Component, inject } from '@angular/core';
import { DeferirService } from '../../../services/deferir.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [NgFor],
  providers: [{provide: DeferirService}],
  templateUrl: './ordem-servico.component.html',
  styleUrl: './ordem-servico.component.scss'
})
export class OrdemServicoComponent {
  constructor(){
    this.getOrdemServicoItems()
  }
  ordemServicoItemsList: any = []
  deferirService = inject(DeferirService)
  s3Url = 'https://unc-radio.s3.amazonaws.com/'

  getOrdemServicoItems(){
    this.deferirService.getOrdemServicoItems().subscribe({
      next: (value) => {
        this.ordemServicoItemsList = value
        console.log(this.ordemServicoItemsList)
      },
    })
  }

  downloadFile(e: any){
    const url = `${this.s3Url}${e.target.value}`
    window.open(url, '_blank')
  }


}
