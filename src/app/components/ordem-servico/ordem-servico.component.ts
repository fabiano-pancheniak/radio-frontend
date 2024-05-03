import { Component, inject } from '@angular/core';
import { DeferirService } from '../../services/deferir.service';

@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [],
  providers: [{provide: DeferirService}],
  templateUrl: './ordem-servico.component.html',
  styleUrl: './ordem-servico.component.scss'
})
export class OrdemServicoComponent {
  deferirService = inject(DeferirService)
  constructor(){
    this.getOrdemServicoItems()
  }
  ordemServicoItemsList: any = []

  getOrdemServicoItems(){
    this.deferirService.getOrdemServicoItems().subscribe({
      next: (value) => {
        this.ordemServicoItemsList = value
        console.log(this.ordemServicoItemsList)
      },
    })
  }


}
