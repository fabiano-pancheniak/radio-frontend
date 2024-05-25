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
import { ServicoComponent } from './components/admin/servico/servico.component';
import { ServicoFormComponent } from './components/admin/servico/servico-form/servico-form.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserParentComponent } from './components/user-parent/user-parent.component';
import { MinhasSolicitacoesComponent } from './components/minhas-solicitacoes/minhas-solicitacoes.component';
import { DetailsComponent } from './components/minhas-solicitacoes/details/details.component';
import { ContratoComponent } from './components/contrato/contrato.component';

export const routes: Routes = [
    //{path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: '', component: UserParentComponent, canActivate: [userGuard], children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: UserHomeComponent},
        {path: 'apoio-cultural', component: ApoioCulturalComponent},
        {path: 'dados-cadastrais', component: DadosCadastraisComponent},
        {path: 'minhas-solicitacoes', component: DeferirComponent},
        {path: 'minhas-solicitacoes/:id', component: OrdemServicoComponent},
        {path: 'aceite-digital/:id', component: ContratoComponent}
    ]},
    {path: 'auth', component: AuthComponent, children: [
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent},
    ]},
    {path: 'admin', component: HomeComponent, canActivate: [adminGuard], children: [
        {path: 'deferir', component: DeferirComponent},
        {path: 'deferir/:id', component: OrdemServicoComponent},
        {path: 'servico', component: ServicoComponent},
        {path: 'servico-form', component: ServicoFormComponent}
    ]}
];
