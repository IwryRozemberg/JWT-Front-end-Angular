import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  public usuario: Usuario = {} as Usuario;
  public termoUsuario = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  public onSubmit(): void {
    this.usuarioService.cadastar(this.usuario).subscribe(
      () => {
        this.toastr.success('Cadastro realizado.', 'Sucesso');
        this.authService.logar(this.usuario).subscribe(() => {
          this.toastr.success('Bem vindo.', 'Sucesso');
        });
      },
      (erro) => {
        console.log(erro);
        if (erro.status && erro.status === 409) {
          this.toastr.error('Usuário já cadastrado. Experimente utilizar outro e-mail.', 'Falha');
        } else {
          this.toastr.error('Não foi possível realizar o cadastro.', 'Falha');
        }
      }
    );
  }
}
