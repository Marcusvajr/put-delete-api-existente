# Tarefa: Implementar Endpoints de Edição e Deleção de Livro

## Objetivo

A tarefa consiste em implementar dois endpoints em uma API para gerenciar livros:

- **PUT /livros/:id**: Editar um livro específico.
- **DELETE /livros/:id**: Deletar um livro específico.

Além disso, é necessário escrever **testes** para ambos os endpoints, garantindo que as funcionalidades estão funcionando corretamente.

## Requisitos

1. **Endpoint PUT /livros/:id**: 
    - O endpoint deve permitir a edição de um livro existente.
    - O corpo da requisição deve conter os dados atualizados do livro (exemplo: título, autor, genrer).
    - Se o livro não for encontrado, retorne uma resposta adequada (ex: `404 Not Found`).
    - O usuário só poderá editar livros adicionados por ele.

2. **Endpoint DELETE /livros/:id**:
    - O endpoint deve permitir a exclusão de um livro existente.
    - Se o livro não for encontrado, retorne uma resposta adequada (ex: `404 Not Found`).
    - Após a exclusão, retorne uma resposta de sucesso (ex: `200 OK` ou `204 No Content`).
    - O usuário só poderá deletar livros adicionados por ele.

3. **Testes**:
    - Implemente testes automatizados para garantir que os endpoints `PUT` e `DELETE` funcionam corretamente.

## Instruções

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto:

```bash
git clone https://github.com/CampossCaio/puc-minas.git
cd puc-minas/nodejs/classes/api-rest-nodejs
```
### 2. Instalar as Dependências

Usando **npm**:

```bash
npm install
```
Usando **yarn**:

```bash
yarn install
```
Esses comandos irão baixar todas as dependências listadas no arquivo package.json do projeto.

### 3. Rodar as Migrations

Antes de rodar o comando para criar as migrations, é importante criar os arquivos `.env` e `.env.test` e adicionar as variáveis de exemplo contidas nos arquivos `.env.example` e  `.env.test.example`.

```
NODE_ENV=development
DATABASE_URL='./db/db.sqlite'
DATABASE_CLIENT=sqlite
```

Usando **npm**:

```bash
npx knex -- migrate:latest
```
Usando **yarn**:

```bash
yarn knex -- migrate:latest
```
Isso irá executar as migrações e criar as tabelas necessárias no banco de dados.

### 4. Executar o Servidor

Usando **npm**:

```bash
npm run dev
```
Usando **yarn**:

```bash
yarn dev
```
O servidor estará rodando em http://localhost:3000 (ou outra porta configurada no projeto). Agora você pode acessar e testar a API no seu navegador ou usar ferramentas como Postman, Insomnia ou HTTpie.



## Modificacoes implementadas

- Implementadas as rotas `PUT /books/:id` e `DELETE /books/:id` com autenticacao via cookie/JWT, validacao de dados e conferencia de propriedade do livro (`user_id`).
- Mantidos os requisitos de resposta: `404` para livro nao encontrado, `200` com dados atualizados no `PUT`, e `204` no `DELETE`.

### 5. Executar os testes

Usando **npm**:

```bash
npm test
```