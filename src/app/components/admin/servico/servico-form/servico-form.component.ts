import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './servico-form.component.html',
  styleUrl: './servico-form.component.scss'
})
export class ServicoFormComponent {
  constructor(private route: ActivatedRoute){ 
    console.log(this.servicoId)
  }

  servicoId: string | null = this.route.snapshot.queryParams['servico'] || null

  servicoForm = new FormGroup({
    descricao: new FormControl(''),
    valor: new FormControl(''),
    observacao: new FormControl('')
  })

  onSubmit(){
    console.log(this.servicoForm.value)
  }
}
