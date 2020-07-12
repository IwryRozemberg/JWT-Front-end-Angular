import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { Usuario } from '../interfaces/usuario';
import { TokenApi } from '../interfaces/respostas/token-api';
import { TokenService } from './token.service';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _autenticado: BehaviorSubject<boolean>;
  public readonly autentidado$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this._autenticado = new BehaviorSubject(false);
    this.autentidado$ = this._autenticado.asObservable();
  }

  public logar(usuario: Usuario): Observable<boolean> {
    const url = `${environment.linguagensApiUrl}/auth/login`;
    return this.http.post<TokenApi>(url, usuario).pipe(
      map((resposta: TokenApi) => {
        if (!this.criarSessao(resposta.token)) {
          throw new Error();
        }
        return true;
      })
    );
  }

  public deslogar(): Observable<TokenApi> {
    const url = `${environment.linguagensApiUrl}/auth/logout`;

    return this.http.post<TokenApi>(url, {}).pipe(
      finalize(() => { this.resetarSessao(); })
    );
  }

  public criarSessao(token: string): boolean {
    try {
      const usuario: Usuario = jwtDecode(token);
      this.usuarioService.usuario = usuario;
      this.tokenService.token = token;
      this._autenticado.next(true);
      return true;
    } catch (err) {
      return false;
    }
  }

  public resetarSessao(): void {
    this.tokenService.resetToken();
    if (this._autenticado.value) {
      this._autenticado.next(false);
      console.log(this._autenticado.value);
    }
  }
}
