import { MenuModel } from './models/menu.model';

export const menu = new Array<MenuModel>();

const home = new MenuModel();
home.descricao = 'Home';
home.path = '/home';
home.permissao = '';
menu.push(home);

const avaliacao = new MenuModel();
avaliacao.descricao = 'Avaliacao';
avaliacao.path = '/avaliacao';
avaliacao.permissao = '';
menu.push(avaliacao);

const questao = new MenuModel();
questao.descricao = 'Questão';
questao.path = '/questao';
questao.permissao = 'ROLE_ADMIN';
menu.push(questao);

const prova = new MenuModel();
prova.descricao = 'Prova';
prova.path = '/prova';
prova.permissao = 'ROLE_ADMIN';
menu.push(prova);

const candidato = new MenuModel();
candidato.descricao = 'Candidato';
candidato.path = '/candidato';
candidato.permissao = 'ROLE_ADMIN';
menu.push(candidato);
