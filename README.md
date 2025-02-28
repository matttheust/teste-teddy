# Projeto de Gerenciamento de Clientes - TESTE - Teddy

Sistema de gerenciamento de clientes com front-end em React + Vite e back-end em Nest.js com TypeORM e Postgres.

## Sobre o Sistema

O sistema possui uma tela inicial para inserir o nome do usuário, que será redirecionado para uma tela com a lista de clientes cadastrados. Nessa tela, será possível cadastrar, selecionar, atualizar e excluir clientes, além de visualizar os clientes selecionados.

## Requisitos

- Docker
- Docker Compose
- Git

## Estrutura do Projeto

```
├── backend/ # Código do back-end (Nest.js)  
├── frontend/ # Código do front-end (React + Vite)  
├── docker-compose.yml # Arquivo de configuração do Docker Compose  
└── README.md # 
```


## Configuração e Execução

1.  **Clonar o Repositório**
```
git clone <URL_DO_REPOSITORIO>  
cd <nome_do_repositorio> 
```


2.  **Configurar as Variáveis de Ambiente**

Crie os arquivos `.env` para o back-end e o front-end.

```
*   `.env.backend` (backend/)
```

```
`.env`
DATABASE_HOST=db  
DATABASE_PORT=5432  
DATABASE_USERNAME=<seu_usuario_postgres>  
DATABASE_PASSWORD=<sua_senha_postgres>  
DATABASE_NAME=clientes_db  
PORT=3000
```


*   `.env.frontend` (frontend/)

```
VITE_API_URL=[http://localhost:3000](http://localhost:3000/)
```


3.  **Construir e Iniciar os Contêineres**

```
docker-compose up --build -d
```

4.  **Acessar as Aplicações**

*   Front-end: `http://localhost:5173`
*   Back-end: `http://localhost:3000`
  

5.  **Parar os Contêineres**

```
docker-compose down
```

## Informações Adicionais

*   **Back-end**
    *   Conexão com o banco de dados em `.env.backend`.
    *   Executar migrations:

```
docker exec -it <nome_do_container_backend> npm run typeorm migration:run
```

*   **Front-end**
    *   `VITE_API_URL` no `.env.frontend` deve apontar para o back-end.

## Testes

* Front-end: Testes End-to-End implementados.
* Back-end: Testes Unitários implementados.

Execução dos testes:

```
docker exec -it <nome_do_container_backend> npm run test # Back-end  
docker exec -it <nome_do_container_frontend> npm run test:e2e # Front-end
```


## Melhorias Implementadas

*   Front-end: Testes End-to-End
*   Back-end: Observabilidade, Documentação com Swagger, Testes Unitários - 

## Padrões de Código e Commits

*   Padrões de código: TypeScript/JavaScript
*   Commits: Conventional Commits




