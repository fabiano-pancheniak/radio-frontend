import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dados-cadastrais',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  providers: [{provide: UserService}, {provide: AuthService}],
  templateUrl: './dados-cadastrais.component.html',
  styleUrl: './dados-cadastrais.component.scss'
})
export class DadosCadastraisComponent {
  constructor(){
    this.authService.getUserData(localStorage.getItem('access-token')).subscribe(res => {
        this.userId = res.id
        this.getUserData(res.id)
      }) 
    this.getEstadosList()
  }
  userService = inject(UserService);
  addressService = inject(AddressService);
  authService = inject(AuthService)
  estadosList: any = []
  userId: string = ''

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
    this.userService.updateUserInfo(this.profileForm.value, this.userId).subscribe()
  }

}
