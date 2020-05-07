import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css']
})
export class QuestaoListarComponent implements OnInit {

  questoes =  [
    {id: 2, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 3, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "},
    {id: 1, senioridade: "JUNIOR", tipo_questao: "Codificação", descricao: "Qual é a: "}
  ]

  //questoes: any[];
  questoesSelecionadas: any[];
  definicaoColunas: any[];

  constructor() { }

  ngOnInit(): void {

    this.definicaoColunas = [
      {field: 'id', header: 'Código'},
      {field: 'descricao', header: 'Descrição'},
      {field: 'senioridade', header: 'Titulo'},
      {field: 'tipo_questao', header: 'Tipo da Questão'}
    ];
  }

  isSelected(): boolean {
    return this.questoesSelecionadas && this.questoesSelecionadas.length === 1;
  }


}
