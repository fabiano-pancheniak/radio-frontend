import { Component } from '@angular/core';
import { OrdemServicoService } from '../../../services/ordem-servico/ordem-servico.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(private ordemServicoService: OrdemServicoService, private route: ActivatedRoute){
    this.getOrdemServicoItems()
    
    this.ordemServicoItems$.subscribe(res => console.log(res))
  }

  ordemServicoItems$ = new Observable<any[]>();

  getOrdemServicoItems(){
    const ordemServicoId = this.route.snapshot.paramMap.get('id');
    this.ordemServicoItems$ = this.ordemServicoService.getOrdemServicoItems(ordemServicoId)
  }
}
