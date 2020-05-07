export class Questao {
  codigo: number;
  descricao: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
  alternativa5: string;
  resposta: string;
  senioridade: string;
  tipoQuestao: string;
}

// ID              INT          NOT NULL AUTO_INCREMENT,
//     DESCRICAO       VARCHAR(400) NOT NULL,
//     ALTERNATIVA_1   VARCHAR(400) NOT NULL,
//     ALTERNATIVA_2   VARCHAR(400) NOT NULL,
//     ALTERNATIVA_3   VARCHAR(400) NOT NULL,
//     ALTERNATIVA_4   VARCHAR(400) NOT NULL,
//     ALTERNATIVA_5   VARCHAR(400) NOT NULL,
//     RESPOSTA        INT          NOT NULL,
//     ID_SENIORIDADE  INT          NOT NULL,
//     ID_TIPO_QUESTAO INT          NOT NULL,
//     PRIMARY KEY (ID),
//     FOREIGN KEY (ID_SENIORIDADE) REFERENCES SENIORIDADE (ID),
//     FOREIGN KEY (ID_TIPO_QUESTAO) REFERENCES TIPO_QUESTAO (ID)
