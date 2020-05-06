CREATE TABLE IF NOT EXISTS TIPO_QUESTAO
(
    ID        INT         NOT NULL AUTO_INCREMENT,
    DESCRICAO VARCHAR(80) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO TIPO_QUESTAO(DESCRICAO)
VALUES ('Requisito'),
       ('Análise e Projeto'),
       ('Codificação'),
       ('Teste'),
       ('Arquitetura');