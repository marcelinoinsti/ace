import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { AtributosComponent } from './components/atributos/atributos.component';
import { PassosVariaveisComponent } from './components/passos-variaveis/passos-variaveis.component';
import { CadastroPassosComponent } from './components/cadastro-passos/cadastro-passos.component';
import { EspecificadorElevadoresComponent } from './components/especificador-elevadores/especificador-elevadores.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AtributosComponent,
    PassosVariaveisComponent,
    CadastroPassosComponent,
    EspecificadorElevadoresComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    PoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
