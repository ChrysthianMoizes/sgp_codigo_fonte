import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  exibir: boolean = false;
  hader: string = '';
  @Output() alterar = new EventEmitter();
  descricao: string = '';
  constructor() {}

  ngOnInit(): void {}

  salvar() {
    //pegar os dados e salvar
    this.alterar.emit(null);
  }

  exibirDialog(id: string, questoesSelecionadas: any) {
    this.descricao = questoesSelecionadas[0].descricao;
    if (id == '2') {
      this.exibir = true;
      this.hader = 'Editar Questão';
    } else {
      this.exibir = true;
      this.hader = 'Cadastrar Questão';
    }
  }
}
