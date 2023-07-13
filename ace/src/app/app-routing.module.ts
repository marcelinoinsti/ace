import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtributosComponent } from './components/atributos/atributos.component';
import { PassosVariaveisComponent } from './components/passos-variaveis/passos-variaveis.component';
import { CadastroPassosComponent } from './components/cadastro-passos/cadastro-passos.component';
import { EspecificadorElevadoresComponent } from './components/especificador-elevadores/especificador-elevadores.component';

const routes: Routes = [
  { path: '', redirectTo: 'atributos', pathMatch: 'full' },
  { path: 'atributos', component: AtributosComponent },
  { path: 'passos-variaveis', component: PassosVariaveisComponent },
  { path: 'cadastro-passos', component: CadastroPassosComponent },
  { path: 'especificador-elevadores', component: EspecificadorElevadoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
