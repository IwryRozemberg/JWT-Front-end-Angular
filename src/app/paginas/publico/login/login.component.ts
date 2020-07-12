import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario: Usuario = {} as Usuario;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  public onSumbit(): void {
    this.authService.logar(this.usuario).subscribe(
      () => {
        this.toastr.success('Bem vindo.', 'Sucesso');
      },
      (erro) => {
        if (erro.status && erro.status === 401) {
          this.toastr.error('E-mail e/ou senha incorretos.', 'Falha');
        } else {
          this.toastr.error('Não foi possível realizar acesso.\nContate o administrador do sistema.', 'Falha');
        }
      }
    );
  }
}
