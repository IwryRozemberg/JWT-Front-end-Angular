import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenApiService } from './interceptadores/token-api.service';
import { InvalidTokenApiService } from './interceptadores/invalid-token-api.service';
import { HeaderComponent } from './compartilhado/header/header.component';
import { ImgHeaderComponent } from './compartilhado/img-header/img-header.component';
import { BemVindoComponent } from './paginas/publico/bem-vindo/bem-vindo.component';
import { LoginComponent } from './paginas/publico/login/login.component';
import { CadastroComponent } from './paginas/publico/cadastro/cadastro.component';
import { DashboardComponent } from './paginas/restrito/dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { CardGraficoLinguagensComponent } from './compartilhado/card-grafico-linguagens/card-grafico-linguagens.component';
import { CardListaLinguagensComponent } from './compartilhado/card-lista-linguagens/card-lista-linguagens.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BemVindoComponent,
    LoginComponent,
    CadastroComponent,
    ImgHeaderComponent,
    DashboardComponent,
    CardGraficoLinguagensComponent,
    CardListaLinguagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(environment.toastConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
