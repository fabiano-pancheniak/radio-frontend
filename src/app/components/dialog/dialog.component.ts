import { Component, inject, Inject, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ServicoComponent } from '../admin/servico/servico.component';
import { ServicoService } from '../../services/ordem-servico/servico.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  providers: [{provide: ServicoService}],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServicoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { 
    this.servicoService.getServico(data).subscribe(res => this.currServico = res)
  }
  currServico: any = []
  servicoService = inject(ServicoService)
  @Output() servicoDeleted: EventEmitter<void> = new EventEmitter<void>();

  deleteServico(servicoId: string){
    this.servicoService.deleteServico(servicoId).subscribe({
      next: (res) => {
        //refetch to populate a list
        this.servicoDeleted.emit();
        this.dialogRef.close()
      }
    })
  }
}
