
   <h1> Bem vinde ao repositório do Trybe Futebol Clube ⚽️</h1>
 
 
 O Trybe Futebol Clube é um projeto Full Stack desenvolvido durante minha formação em Desenvolvimento Full Stack Web pela Trybe, no módulo de back-end. Fui responsável por fazer o backend da aplicação, <strong> o front-end foi fornecido pela Trybe</strong> 
  
 ## Mas o que é o Trybe Futebol Clube?
  O TFC(Trybe Futebol Clube) é um site informativo sobre partidas e classificações de futebol!
  No TFC você pode ver a classificação geral dos times, além de poder ver as classificações de times da casa ou de times de fora, separadamente. Para usar o site, você deve fazer o login, tanto quanto user quanto com admin. No entanto, se você usa como user, você não poderá  modificar e finalizar partidas.
  
  <strong>Login de admin:</strong> email: admin@admin.com, password: secret_admin.<br>
  <strong>Login do user:</strong> email: user@user.com, password: secret_user.
  
  ## O que foi feito
  Eu desenvolvi uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.Também construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento **respeitou as regras de negócio** exigidas no projeto e **a API deve ser capaz de ser consumida por um front-end**.
 A autentificação do login é feita pelo _token_, portanto a pessoa deverá estar logada para fazer as alterações.
 Fiz o relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.
 
---

## Habilidades

- Escrever APIs utilizando Node.js e Express;
- Utilizar a Arquitetura MSC (Model, Service, Controller). 
- Criar rotas e aplicar middlewares e tratamento de erros com express-async-errors;
- Utilizar ORM Sequelize para criação de queries;
- Criar queries do MySQL;  
- Utilizar o Paradigma de Orientação a Objetos (POO);
- Testes de integração;
- Utilizar o Docker para rodar separadamente os ambientes.



## Instruções para instalar e rodar os testes de cada requisito

```bash
# Clone o repositório
 git clone git@github.com:Leticia-C/trybe-futebol-clube.git
# Entre na pasta do repositório que você acabou de clonar:
  cd trybe-futebol-clube
# Entre na parte de backend do projeto
  cd ./app/backend
# Instale as dependências e inicialize o projeto
  npm install
# Entre no Vs Code para verificar os arquivos usando o atalho no terminal:
  code .
#Para iniciar o projeto, execute o comando:
  docker compose up -d
# Para rodar os tests use o atalho no terminal:
  npm run test
# Para rodar os testes criados:
  cd ./app/backend/ && npm run test:coverage
```

## Detalhes
<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**

- Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
- Tem o papel de fornecer dados para o serviço de _backend_.
- Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
- Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**

- Será o ambiente que você realizará a maior parte das implementações exigidas.
- Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
- Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
- Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
- Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**

- O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
- Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
- O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
- Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**

- O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
- Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

<details>
  <summary><strong> Rotas</strong></summary><br />

1️⃣ **Rotas de usuários:**

- POST /login
  - responsável por registrar o login e retornar um token de usuário.
- GET /login/validate
  - responsável validar o login e retornar a 'role' do usuário.

2️⃣ **Rotas de times:**

- GET /teams
  - responsável por retornar times cadastrados no DB.
- GET /teams/:id
  - responsável por retornar times cadastrados no DB através do ID.

3️⃣ **Rotas de Partidas:**

- GET /matches
  - responsável por retornar todas as partidas.
- POST /matches/
  - responsável por cadastrar uma partida no DB.
    -PATCH /matches/:id
  - responsável por atualizar goas de uma partida específica
- PATCH /matches/:id/finish
  - responsável por atualizar o status de uma partida em andamento para partida finalizada ('inProgress: false') no DB.

4️⃣ **Rotas de Líderes:**

- GET /leaderboard
  - responsável por retornar os líderes do campeonato (dentro ou fora de casa).
- GET /leaderboard/home
  - responsável por retornar os líderes do campeonato jogando em casa.
- GET /leaderboard/away
  - responsável por retornar os líderes do campeonato jogando fora de casa

</details>

</details>
   
