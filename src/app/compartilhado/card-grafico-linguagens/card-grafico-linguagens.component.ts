import { Component, Input } from '@angular/core';

import { Linguagem } from '../../interfaces/linguagem';


@Component({
  selector: 'app-card-grafico-linguagens',
  templateUrl: './card-grafico-linguagens.component.html',
  styleUrls: ['./card-grafico-linguagens.component.css']
})
export class CardGraficoLinguagensComponent {
  public nomesLinguagens: string[];
  public curtidasLinguagens: number[];
  public tipoGrafico = 'doughnut';

  @Input() set linguagens(listLinguagens: Linguagem[]) {
    if (listLinguagens) {
      this.nomesLinguagens = listLinguagens.map(linguagem => {
        return linguagem.nome;
      });
      this.curtidasLinguagens = listLinguagens.map(linguagem => {
        return linguagem.numeroUsuarios;
      });
    }
  }
}
