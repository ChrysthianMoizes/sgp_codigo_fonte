# SGP

Este sistema faz o gerenciamento de provas aplicadas pela Basis.

Nas próximas seções serão apresentados os requisitos e o procedimento para realizar o setup da aplicação.


## Requisitos

Para montar o ambiente do projeto é necessário:

* Java 8
* NodeJS 10.20.1
* Docker
* Git
* Maven


## Containers Dockers 

O primeiro passo a ser realizado é a configuração dos containers dockers do projeto.
Para isso é necessário executar o comando abaixo na pasta **/banco** na raíz do projeto.

    $ docker-compose up

O comando acima irá configurar todos os containers utilizados pela aplicação. Os containers são:

* MySQL:5.7


## Configuração do Frontend

O frontend trabalha com o gerenciador de dependências 'npm'. Para configurar e iniciar o front, basta executar os comandos abaixo dentro da pasta **/frontend/sgp**:

    $ npm install

Depois da instalação das dependências é necessário iniciar a aplicação frontend:

    $ npm start

O comando acima irá iniciar o servidor node na porta 4200. Para acessar a aplicação, basta acessar a url baixo:

    http://localhost:4200


## Configuração do Backend

Este projeto foi desenvolvido utilizando a arquitetura Spring e conta com vários módulos para seu completo funcionamento.

Para que seja devidamente preparado o ambiente para sua execução, deve-se executar o comando abaixo.

    $ mvn clean install

Este comando irá compilar algumas classes essenciais para a execução da aplicação.


## Configurações dos projetos nas IDEs

Este projeto é um projeto Maven. Com isso, o processo de configuração dele é o padrão de qualquer projeto maven.

Basta importar um novo projeto maven apontando para o pom parent localizado na raíz do projeto.

Os demais detalhes de configurações fica a critério de cada IDE utilizada.
