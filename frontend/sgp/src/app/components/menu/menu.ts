import { MenuModel } from './menu.model';

export const menu = new Array<MenuModel>();

const home = new MenuModel();
home.descricao = 'Home';
home.path = '/home';
home.permissao = false;
menu.push(home);

const avaliacao = new MenuModel();
avaliacao.descricao = 'Avaliacao';
avaliacao.path = '/avaliacao';
avaliacao.permissao = false;
menu.push(avaliacao);

const questao = new MenuModel();
questao.descricao = 'Questão';
questao.path = '/questoes';
questao.permissao = true;
menu.push(questao);

const prova = new MenuModel();
prova.descricao = 'Prova';
prova.path = '/prova';
prova.permissao = true;
menu.push(prova);

const candidato = new MenuModel();
candidato.descricao = 'Candidato';
candidato.path = '/candidatos';
candidato.permissao = true;
menu.push(candidato);
