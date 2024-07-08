# <center> OneBitFlix - Backend </center>

## :question: Introdução 

O *OneBitFlix* é um *web app* para assistir cursos de programação online sob demanda. Trata-se de um projeto de estudos que busca aprofundas conhecimentos sobre desenvolvimento web.

O projeto foi idealizado pela plataforma de cursos de programação **OneBitCode**.

Tal repositório armazena apenas o **backend** do *OneBitFlix*, cujo *frontend* está armazenado no repositório [onebitflix-frontend](https://github.com/hugofsantos/onebitflix-frontend).



## :fire: Como Executar o Projeto

Primeiramente, clone ou baixe o código do projeto na sua máquina. Para executar o projeto localmente, é necessário ter o **Node.js** e **npm** instalados. Dado isso, execute os seguintes passos:

1.  navegue até a pasta do projeto e execute o seguinte comando para instalar as dependências:
   ```bash
   npm run dev
   ```

2. Crie a pasta `uploads` no diretório raiz;

3.  Tenha um serviço `postgres` executando com um banco para armazenar os dados do `OneBitFlix-backend`;

4. Crie um arquivo chamado `.env` no diretório raiz do projeto com base no arquivo `.env.example` informando as credenciais corretas do seu banco além de outros parâmetros;

5. Crie a estrutura de tabelas do banco de dados através do `sequelize-cli` com o seguinte comando:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. Alimente o banco com dados iniciais através do seguinte comando:

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. Execute o projeto através do seguindo comando:
   ```bash
   npm run dev
   ```

