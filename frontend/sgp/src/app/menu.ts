import { MenuModel } from "./models/menu.model";

export const menu = new Array<MenuModel>();

const home = new MenuModel();
home.descricao = "Home";
home.path = "/home";
home.permissoes = [
  'ROLE_CADASTRAR_PROVA',
  'ROLE_CADASTRAR_QUESTAO'
]
menu.push(home);

