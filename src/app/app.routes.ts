import { Routes } from '@angular/router';
import { ApoioCulturalComponent } from './components/apoio-cultural/apoio-cultural.component';
import { DeferirComponent } from './components/deferir/deferir.component';
import { OrdemServicoComponent } from './components/ordem-servico/ordem-servico.component';

export const routes: Routes = [
    {path: '', redirectTo: 'apoio-cultural', pathMatch: 'full'},
    {path: 'apoio-cultural', component: ApoioCulturalComponent},
    {path: 'deferir', component: DeferirComponent},
    {path: 'ordem-servico/:id', component: OrdemServicoComponent}
];
