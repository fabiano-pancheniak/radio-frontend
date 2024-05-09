import { Routes } from '@angular/router';
import { ApoioCulturalComponent } from './components/apoio-cultural/apoio-cultural.component';
import { DeferirComponent } from './components/admin/deferir/deferir.component';
import { OrdemServicoComponent } from './components/admin/ordem-servico/ordem-servico.component';
import { DadosCadastraisComponent } from './components/dados-cadastrais/dados-cadastrais.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/admin/home/home.component';
import { adminGuard, userGuard } from './guard/admin.guard';
import { AuthComponent } from './components/auth/auth/auth.component';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: 'apoio-cultural', component: ApoioCulturalComponent, canActivate: [userGuard]},
    {path: 'dados-cadastrais', component: DadosCadastraisComponent, canActivate: [userGuard]},
    {path: 'auth', component: AuthComponent, children: [
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent},
    ]},
    {path: 'admin', component: HomeComponent, canActivate: [adminGuard], children: [
        {path: 'deferir', component: DeferirComponent},
        {path: 'deferir/:id', component: OrdemServicoComponent},
    ]}
];
