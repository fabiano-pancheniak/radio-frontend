import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dados-cadastrais',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  providers: [{provide: UserService}],
  templateUrl: './dados-cadastrais.component.html',
  styleUrl: './dados-cadastrais.component.scss'
})
export class DadosCadastraisComponent {
  constructor(){
    this.getUserData("5844c86f-4c62-4070-9389-314c46a97c19")  
    this.getEstadosList()
  }
  userService = inject(UserService);
  addressService = inject(AddressService);
  estadosList: any = []

  profileForm = new FormGroup({
    cpfCnpj: new FormControl(''),
    fullName: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    district: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    cep: new FormControl(''),
    phone: new FormControl('')
  });

  getUserData(userId: String){
    this.userService.getUserInfo(userId).subscribe({
      next: (value) => {
        this.profileForm.setValue({
          cpfCnpj: value.cpfCnpj,
          fullName: value.fullName,
          address: value.address,
          number: value.number,
          district: value.district,
          city: value.city,
          state: value.state,
          cep: value.cep,
          phone: value.phone
        })
      },
      error(err) {
        console.log(err);
      },
    })
  }

  getEstadosList(){
    this.addressService.getEstados().subscribe({
      next: (value) => {
        this.estadosList = value
      },
    })
  }

  consultaCEP(e: any){
    this.addressService.consultaCEP(e.target.value).subscribe({
      next: (value) => {
        this.profileForm.patchValue({
          address: value.logradouro,
          state: value.uf,
          city: value.localidade,
          district: value.bairro
        })
      }
    })
  }

  onSubmit() {
    this.userService.updateUserInfo(this.profileForm.value, '09abcfed-c17e-456c-9793-138ab970d680').subscribe()
  }

}
