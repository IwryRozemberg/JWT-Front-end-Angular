import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario: BehaviorSubject<Usuario>;
  public readonly usuario$: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this._usuario = new BehaviorSubject({} as Usuario);
    this.usuario$ = this._usuario.asObservable();
  }

  public set usuario(usuario: Usuario) {
    this._usuario.next(usuario);
  }

  public cadastar(usuario: Usuario): Observable<any> {
    const url = `${environment.linguagensApiUrl}/usuarios`;
    return this.http.post(url, usuario);
  }
}
