import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../../../../services/ordem-servico/servico.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: 
  [
    ReactiveFormsModule, 
    MatSnackBarModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule
  ],
  providers: [{provide: ServicoService}],
  templateUrl: './servico-form.component.html',
  styleUrl: './servico-form.component.scss'
})
export class ServicoFormComponent {
  constructor(private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar){
    if(this.servicoId){
      this.servicoService.getServico(this.servicoId).subscribe(res => {
        this.servicoForm.controls['descricao'].setValue(res.descricao)
        this.servicoForm.controls['valor'].setValue(res.valor.toString())
        this.servicoForm.controls['observacao'].setValue(res.observacao)
      })
    }
  }

  servicoId: string | null = this.route.snapshot.queryParams['servico'] || null
  servicoService = inject(ServicoService)
  servicoForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    observacao: new FormControl('')
  })

  onSubmit(){
    if(this.servicoId){
      this.servicoService.updateServico(this.servicoId, this.servicoForm.value).subscribe(
        res => {
          this._snackBar.open("Serviço atualizado", '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          })
          this.router.navigate(['admin/servico'])
        })
        return
      }
      this.servicoService.createServico(this.servicoForm.value).subscribe(res => {
        this._snackBar.open("Serviço cadastrado", '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        })
        
        this.router.navigate(['admin/servico'])
      })
  }

  voltar(){
    this.router.navigate(['admin/servico'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
