# GitHub Repository Search Application - README

Este projeto é um aplicativo web para pesquisar e gerenciar repositórios do GitHub, utilizando uma arquitetura de microserviços. A aplicação utiliza React e Typescript no frontend, Typescript no backend, RabbitMQ para mensageria assíncrona e MariaDB como banco de dados.

<details>
  <summary><b>Estrutura do Projeto</b></summary>
  <ul>
    <li>
      <details>
        <summary><b>frontend</b></summary>
        <ul>
          <li>
            <details>
              <summary><b>src</b></summary>
              <ul>
                <li>
                  <details>
                    <summary><b>components</b></summary>
                    <ul>
                      <li><code>SearchBar.tsx</code></li>
                      <li><code>RepoTable.tsx</code></li>
                      <li><code>RepoRow.tsx</code></li>
                    </ul>
                  </details>
                </li>
                <li><code>App.tsx</code></li>
                <li><code>index.tsx</code></li>
                <!-- ... -->
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary><b>backend-a</b></summary>
        <ul>
          <li>
            <details>
              <summary><b>src</b></summary>
              <ul>
                <li><code>controllers</code></li>
                <li><code>services</code></li>
                <li><code>app.ts</code></li>
                <!-- ... -->
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary><b>backend-b</b></summary>
        <ul>
          <li>
            <details>
              <summary><b>src</b></summary>
              <ul>
                <li><code>controllers</code></li>
                <li><code>services</code></li>
                <li><code>app.ts</code></li>
                <!-- ... -->
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li><code>docker-compose.yml</code></li>
  </ul>
</details>

## Funcionalidades
O sistema oferece diversas funcionalidades tanto no front-end quanto no back-end. Abaixo estão as principais:

## Front-end (React e Typescript)
1. Pesquisa de Usuários
Barra de pesquisa para buscar usuários do GitHub.

2. Exibição de Dados
Exibe dados dos repositórios em uma tabela com filtragem.

3. Remoção de Repositórios
Permite a remoção de repositórios, atualizando o banco de dados.

4. Notificação (a implementar)
Recebe notificações do backend quando os dados estão disponíveis.

## Back-end A (Express e Typescript)
1. Recebimento de Requisições
Recebe requisições do frontend para buscar usuários do GitHub.

2. Envio para Backend B
Encaminha solicitações para o Backend B via RabbitMQ.

3. Processamento de Respostas (a implementar)
Recebe respostas do Backend B, insere no banco de dados e notifica o frontend.

4. Remoção de Repositórios
Atualiza o banco de dados conforme solicitações de remoção do frontend.

## Back-end B (Express e Typescript)
1. Recebimento de Solicitações
Recebe solicitações de busca do Backend A via RabbitMQ.

2. Busca no GitHub
Faz a busca dos repositórios públicos do usuário na API do GitHub.

3. Envio de Resposta
Retorna os dados obtidos para o Backend A via RabbitMQ.

## Configurações
Requisitos do Ambiente
Node.js
Docker
Docker Compose
Configuração do Ambiente de Desenvolvimento
Clone o repositório do projeto do GitHub:

`git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>`

Crie o arquivo docker-compose.yml com o seguinte conteúdo:

version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend-a

  backend-a:
    build: ./backend-a
    ports:
      - "3001:3001"
    depends_on:
      - rabbitmq
      - mariadb

  backend-b:
    build: ./backend-b
    ports:
      - "3002:3002"
    depends_on:
      - rabbitmq

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: root
      RABBITMQ_DEFAULT_PASS: root

  mariadb:
    image: mariadb
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: db1
Execute os serviços:

`docker-compose up --build`

## Manualmente (sem Docker)
Instale as dependências e inicie o MariaDB e RabbitMQ.

Configure as variáveis de ambiente e inicie os serviços backend e frontend.

## Endpoints
A seguir estão os endpoints disponíveis neste projeto:

Backend A
Pesquisar Usuário no GitHub

Método: POST
URL: /api/search
Descrição: Busca repositórios do usuário no GitHub e envia a solicitação para o Backend B via RabbitMQ.
Remover Repositório

Método: DELETE
URL: /api/repository/:id
Descrição: Remove o repositório do banco de dados.
Backend B
Receber Solicitação de Busca

Método: N/A
URL: N/A
Descrição: Recebe solicitações do Backend A via RabbitMQ e busca os repositórios no GitHub.
Enviar Resposta de Busca

Método: N/A
URL: N/A
Descrição: Envia os resultados da busca de volta para o Backend A via RabbitMQ.
Considerações
Se alguma funcionalidade não estiver completa, explique as razões aqui.
Qualquer dificuldade ou decisão de design importante deve ser documentada.

## Desenvolvedor
Este projeto foi desenvolvido por Pablo Fidelis DIas. Para mais detalhes, consulte o link: https://github.com/pablohsk/github-repo-search.

Qualquer dúvida ou sugestão, sinta-se à vontade para entrar em contato. Obrigado por utilizar o GitHub Repository Search Application!
