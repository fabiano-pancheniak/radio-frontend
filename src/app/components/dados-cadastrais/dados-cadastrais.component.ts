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
  userExists: boolean = false

  profileForm = new FormGroup({
    cpfCnpj: new FormControl(''),
    fullName: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    district: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    cep: new FormControl(''),
    phone: new FormControl(''),
    //Verificar isso aqui
    userId: new FormControl('909488bf-3cfb-4cae-8864-a3baa3c994c1')
  });

  getUserData(userId: String){
    this.userService.getUserInfo(userId).subscribe({
      next: (value) => {
        this.userExists = true
        this.profileForm.patchValue({
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
      error: (err) => {
        this.userExists = false
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
    //implementar update ou create
    //cpf é validado unique
    console.log(this.userExists)
    console.log(this.profileForm.value)
    this.userService.createUserInfo(this.profileForm.value).subscribe()
    //this.userService.updateUserInfo(this.profileForm.value, this.userId).subscribe()
  }

}
