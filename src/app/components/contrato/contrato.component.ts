import { Component } from '@angular/core';
import { Situacao } from '../../../enums/situacao.enum';
import { OrdemServicoService } from '../../services/ordem-servico/ordem-servico.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.scss'
})
export class ContratoComponent {
  constructor(private ordemServicoService: OrdemServicoService, private route: ActivatedRoute){
  }
  ordemServicoId = this.route.snapshot.paramMap.get('id')

  //implementar verificacao de status
  getOrdemServico(){
  }

  aceitarContrato(){
    this.ordemServicoService.updateSituacao(this.ordemServicoId, Situacao.AGUARDANDO_DEFERIMENTO).subscribe(res => console.log(res))
  }

}
