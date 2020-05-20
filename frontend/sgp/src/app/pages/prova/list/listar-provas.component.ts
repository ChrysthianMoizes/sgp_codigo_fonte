import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from '../../../components/alert/alert.service';
import { LoadingService } from '../../../components/loading/loading.service';
import { ProvaService } from '../service/prova.service';
import { Prova } from '../models/prova';
import { CadastrarProvaComponent } from '../form/cadastrar-prova.component';

@Component({
  selector: 'app-listar-provas',
  templateUrl: './listar-provas.component.html',
  styleUrls: ['./listar-provas.component.css'],
  providers: [DialogService],
})
export class ListarProvasComponent implements OnInit {
  provas: Prova[];
  provasSelecionadas: Prova[];
  definicaoColunas: any[];

  @ViewChild('dialogProvaForm') dialogProvaForm: CadastrarProvaComponent;

  constructor(
    private provaService: ProvaService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.provaService.index(null, null).subscribe((provas) => {
      //
    });

    this.definicaoColunas = [
      { field: 'id', header: 'ID' },
      { field: 'titulo', header: 'Titulo' },
      { field: 'percentualAprovacao', header: '% para aprovação' },
    ];
  }

  isOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length >= 1;
  }

  visualizarProva(): void {
    this.dialogProvaForm.abrirDialog(3);
  }

  editarProva(): void {
    this.dialogProvaForm.abrirDialog(2);
  }

  cadastrarProva(): void {
    this.dialogProvaForm.abrirDialog(1);
  }

  atualizarListagem(): void {
    // atualizar a lista com o banco
  }

  excluirProva(): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir prova',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova excluída com sucesso.'
        );
      },
    });
  }
}
