import { Component, inject, OnInit } from '@angular/core';
import { DeferirService } from '../../../services/deferir.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServicoService } from '../../../services/ordem-servico/ordem-servico.service';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { Situacao } from '../../../../enums/situacao.enum';

@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  providers: [{provide: DeferirService}],
  templateUrl: './ordem-servico.component.html',
  styleUrl: './ordem-servico.component.scss'
})
export class OrdemServicoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router){
    this.getOrdemServicoItems()
    this.getOrdemServico()
  }
  ordemServicoItemsList: any = []
  deferirService = inject(DeferirService)
  ordemServicoService = inject(OrdemServicoService)
  s3Url = 'https://unc-radio.s3.amazonaws.com/'
  isAdmin: boolean = false
  ordemServico: any = []
  ordemServicoId = this.route.snapshot.paramMap.get('id');

  deferimentoForm = new FormGroup({
    observacao: new FormControl(''),
    deferido: new FormControl(),
    ordemServicoId: new FormControl(this.route.snapshot.paramMap.get('id'))
  });


  ngOnInit(): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  getOrdemServico(){
    this.ordemServicoService.getOrdemServico(this.ordemServicoId).subscribe(res => {
      this.ordemServico = res
    })
  }

  getOrdemServicoItems(){
    const ordemServicoId = this.route.snapshot.paramMap.get('id');
    this.ordemServicoService.getOrdemServicoItems(ordemServicoId).subscribe({
      next: (value) => {
        this.ordemServicoItemsList = value
      },
    })
  }

  downloadFile(e: any){
    const url = `${this.s3Url}${e.target.value}`
    window.open(url, '_blank')
  }

  setDeferimento(deferido: boolean){
    this.deferimentoForm.patchValue({
      deferido: deferido
      })
    this.deferirService.setDeferimento(this.deferimentoForm.value).subscribe(res => console.log(res))

    if(deferido){
      this.ordemServicoService.updateSituacao(this.ordemServicoId, Situacao.DEFERIDO).subscribe()
      this.router.navigate(['admin/deferir'])
      return
    }
    
    this.ordemServicoService.updateSituacao(this.ordemServicoId, Situacao.NAO_DEFERIDO).subscribe()
    this.router.navigate(['admin/deferir'])
    
  }


}
