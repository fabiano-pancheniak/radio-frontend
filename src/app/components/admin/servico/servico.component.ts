import { Component, inject } from '@angular/core';
import { ServicoService } from '../../../services/ordem-servico/servico.service';
import { Servico } from '../../../interfaces/servico';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
    selector: 'app-servico',
    standalone: true,
    templateUrl: './servico.component.html',
    styleUrl: './servico.component.scss',
    imports: [NgFor, MatTableModule, MatButtonModule],
    providers: [{provide: ServicoService}]
})
export class ServicoComponent {
    displayedColumns: string[] = ['id', 'descricao', 'observacao', 'valor'];
    constructor(private router: Router, public dialog: MatDialog){
        this.getServicos()
        
    }
    servicoService = inject(ServicoService)
    servicosList: Servico[] = []
    
    getServicos(){
        this.servicoService.getServicos().subscribe((response) => {
            this.servicosList = response
        })
    }

    onEdit(e: any){
        this.router.navigate(['admin/servico-form'], { queryParams: { servico: e.target.value } });  
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, e: any): void {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: e.target.value
        });

        dialogRef.componentInstance.servicoDeleted.subscribe(() => {
            this.getServicos()
        });
    }

    onClick(){
        this.router.navigate(['admin/servico-form'])
    }
} 



