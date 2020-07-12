import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { LinguagemService } from './../../../services/linguagem.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Linguagem } from '../../../interfaces/linguagem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public linguagemService: LinguagemService, private toastr: ToastrService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.atualizarLinguagens();
  }

  atualizarLinguagens(): void {
    this.linguagemService.atualizarLinguagens()
      .subscribe(
        () => { },
        (err) => {
          console.log(err);
          this.toastr.error('Falha ao atualizar lista de linguagens.', 'Falha');
        }
      );
  }

  curtirLinguagem(linguagem: Linguagem): void {
    this.linguagemService.curtirLinguagem(linguagem)
      .subscribe(
        () => {
          this.toastr.success(`Você curtiu <b>${linguagem.nome}</b>`, 'Sucesso');
          this.atualizarLinguagens();
        },
        () => {
          this.toastr.error('Não foi possível curtir a linguagem.', 'Falha');
        }
      );
  }
}
