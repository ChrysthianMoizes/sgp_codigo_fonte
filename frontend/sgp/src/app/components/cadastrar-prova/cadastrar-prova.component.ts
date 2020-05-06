import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-prova',
  templateUrl: './cadastrar-prova.component.html',
  styleUrls: ['./cadastrar-prova.component.css']
})
export class CadastrarProvaComponent implements OnInit {

  @Input() isEditando = false;
  provaForm: FormGroup;

  origemQuestoes: Questao[];
  destinoQuestoes: Questao[];
  totalDeQuestoes = QUESTOES.length;
  defaultRowSize = 6;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // TODO: implementar chamdas à api
    this.origemQuestoes = QUESTOES.slice(0, this.defaultRowSize);
    this.destinoQuestoes = [];

    this.provaForm = this.fb.group({
      titulo: ['', Validators.required]
    });
  }

  paginate(event) {
    // TODO: Implementar chamadas à api
    const inicio = event.page * this.defaultRowSize;
    const fim = inicio + this.defaultRowSize;
    this.origemQuestoes = QUESTOES.slice(inicio, fim);
  }

  removeRepetitions(arr: any[]) {
    return arr.filter(
      (questao, i) => arr.indexOf(questao) === i
    );
  }

  onMoveToTarget(event): void {
    this.destinoQuestoes = this.removeRepetitions(this.destinoQuestoes);
  }

  onCancel(): void {
    this.ngOnInit();
  }

  onSubmit(): void {
    //TODO: Implementar logica da api
    const novaProva = {
      ...this.provaForm.value,
      questoes: this.destinoQuestoes
    };
    console.log(novaProva);
    this.onCancel();
  }

  get titulo(): string {
    return this.isEditando ? "Editar Prova" : "Cadastrar Prova";
  }

  get inputSize(): number {
    const inputTitulo = this.provaForm.get('titulo').value;
    return (inputTitulo) ? inputTitulo.length : 20;
  }

  get isFormValid(): boolean {
    return this.provaForm.valid
      && this.destinoQuestoes.length > 0;
  }

}

class Prova {
  titulo: string;
  percentualAprovacao: number;
  questoes: Questao[];
}

interface Questao {
  id: number;
  descricao: string;
  // alternativa1: string;
  // alternativa2: string;
  // alternativa3: string;
  // alternativa4: string;
  // alternativa5: string;
  // resposta: number;
}

const QUESTOES = [
  { id: 1, descricao: 'descri1' },
  { id: 2, descricao: 'descri2' },
  { id: 3, descricao: 'descri3' },
  { id: 4, descricao: 'descri4' },
  { id: 5, descricao: 'descasdas1' },
  { id: 6, descricao: 'descriasdasd2' },
  { id: 7, descricao: 'descrsadi3' },
  { id: 8, descricao: 'descriasda4' },
  { id: 9, descricao: 'descrizxczx1' },
  { id: 10, descricao: 'descrzxzxci2' },
  { id: 11, descricao: 'descrizzx3' },
  { id: 12, descricao: 'descrhji4' },
  { id: 13, descricao: 'descrhjhji1' },
  { id: 14, descricao: 'descrhi2' },
  { id: 15, descricao: 'descri3' },
  { id: 16, descricao: 'descri4' },
  { id: 17, descricao: 'deschjhjri1' },
  { id: 18, descricao: 'descri2' },
  { id: 19, descricao: 'deshjhjcri3' },
  { id: 20, descricao: 'descri4' },
  { id: 21, descricao: 'descri1' },
  { id: 22, descricao: 'descri2' },
  { id: 23, descricao: 'descrhhhhi3' },
  { id: 24, descricao: 'descrihhh4' },
  { id: 17, descricao: 'deschjhjri1' },
  { id: 18, descricao: 'descri2' },
  { id: 19, descricao: 'deshjhjcri3' },
  { id: 20, descricao: 'descri4' },
  { id: 21, descricao: 'descri1' },
  { id: 22, descricao: 'descri2' },
  { id: 23, descricao: 'descrhhhhi3' },
  { id: 24, descricao: 'descrihhh4' }
]
