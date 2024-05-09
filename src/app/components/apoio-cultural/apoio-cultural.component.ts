import { Component, inject } from '@angular/core';
import { ApoioCulturalService } from '../../services/apoio-cultural.service';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-apoio-cultural',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  providers: [{ provide: ApoioCulturalService}, {provide: AuthService}],
  templateUrl: './apoio-cultural.component.html',
  styleUrl: './apoio-cultural.component.scss'
})
export class ApoioCulturalComponent{
  constructor(){ 
    this.getServicos()
  }
  servicosList: any = []
  selectedServices: any = []
  apoioCulturalService = inject(ApoioCulturalService);
  authService = inject(AuthService)
  filesToUpload: any = []
  token = localStorage.getItem('access-token')
    
  servicoItems = new FormGroup({
    quantidade: new FormControl(1),
    servicoId: new FormControl(''),
    valor: new FormControl(''),
    descricao: new FormControl(''),
    valorUnitario: new FormControl(''),
    arquivo: new FormControl('')
  })

  valorOriginal: any = 0
  initialValues = this.servicoItems.value;

  getServicos(){
    if(this.token){
      this.apoioCulturalService.getServicos(this.token).subscribe({
        next: (value) => { 
          this.servicosList = value
         }
      }) 
    }
  } 
  
  createOrdemServico() {
    this.apoioCulturalService.createOrdemServico(this.selectedServices, this.filesToUpload).subscribe()
  }

  onChangeServico(e: any){
    const {valor} = this.servicosList.find((item: any) => item.id == e.value);
    this.valorOriginal = valor
    this.servicoItems.controls['valor'].setValue(valor);
    this.servicoItems.controls['quantidade'].setValue(1);
  }
  
  onChangeQuantidade(e: any){
    let newValue: any = this.valorOriginal * e.value
    this.servicoItems.controls['valor'].setValue(newValue);
  }

  onAddItem(){ 
    const servico = this.servicosList.find((item: any) => item.id == this.servicoItems.value.servicoId);
    this.servicoItems.controls['valorUnitario'].setValue(servico.valor)
    this.servicoItems.controls['descricao'].setValue(servico.descricao)
    console.log(this.selectedServices)
    
    let file: any = (document.getElementById("arquivo") as any).files[0]
    const date = Date.now()
    const fileName = `${date}-${file.name}`
    this.servicoItems.controls['arquivo'].setValue(fileName)
    console.log(file)
    
    this.selectedServices.push(this.servicoItems.value)
    let formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', fileName)
    this.filesToUpload.push(formData)
    this.servicoItems.reset(this.initialValues);
  }
}
