import { Component, inject } from '@angular/core';
import { ServicoService } from '../../../services/ordem-servico/servico.service';
import { Servico } from '../../../interfaces/servico';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-servico',
    standalone: true,
    templateUrl: './servico.component.html',
    styleUrl: './servico.component.scss',
    imports: [NgFor, MatTableModule],
    providers: [{provide: ServicoService}]
})
export class ServicoComponent {
    displayedColumns: string[] = ['id', 'descricao', 'observacao', 'valor'];
    constructor(private router: Router){
        this.getServicos()
    }
    servicoService = inject(ServicoService)
    servicosList: Servico[] = []
    
    getServicos(){
        this.servicoService.getServicos().subscribe((response) => {
            console.log(response)
            this.servicosList = response
        })
    }

    onEdit(e: any){
        this.router.navigate(['admin/servico-form'], { queryParams: { servico: e.target.value } });  
    }
} 

