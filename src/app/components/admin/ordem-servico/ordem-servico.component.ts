import { Component, inject, OnInit } from '@angular/core';
import { DeferirService } from '../../../services/deferir.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServicoService } from '../../../services/ordem-servico/ordem-servico.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [{provide: DeferirService}],
  templateUrl: './ordem-servico.component.html',
  styleUrl: './ordem-servico.component.scss'
})
export class OrdemServicoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService){
    this.getOrdemServicoItems()
  }
  ordemServicoItemsList: any = []
  deferirService = inject(DeferirService)
  ordemServicoService = inject(OrdemServicoService)
  s3Url = 'https://unc-radio.s3.amazonaws.com/'
  isAdmin: boolean = false


  ngOnInit(): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  getOrdemServicoItems(){
    const ordemServicoId = this.route.snapshot.paramMap.get('id');
    this.ordemServicoService.getOrdemServicoItems(ordemServicoId).subscribe({
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
