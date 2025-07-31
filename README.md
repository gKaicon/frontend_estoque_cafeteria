-----

# Frontend - Gestão da Cafeteria

Interface web desenvolvida com Next.js para interagir com a API de gerenciamento da cafeteria. O projeto oferece uma experiência de usuário moderna e responsiva para gerenciar produtos, vendas e compras.

**[🚀 Acesse a demonstração ao vivo](https://estoque-cafeteria.vercel.app)

## ✨ Features

  * **Autenticação Segura:** Páginas de Login e Registro com gerenciamento de tokens JWT.
  * **Dashboard Intuitivo:** Tela principal com acesso rápido às funcionalidades.
  * **Gerenciamento de Produtos:** Interface completa para criar, listar, editar e deletar produtos.
  * **Registro de Compras:** Formulários para registrar a entrada de novos produtos no estoque.
  * **Registro de Vendas:** Interface para registrar as vendas e seus itens.
  * **Notificações Amigáveis:** Feedbacks visuais para o usuário utilizando **React Toastify**.
  * **Design Responsivo:** Layout que se adapta a diferentes tamanhos de tela, construído com **Tailwind CSS**.

## 💻 Tecnologias Utilizadas

  * **Framework:** [Next.js](https://nextjs.org/) (com App Router)
  * **Linguagem:** TypeScript
  * **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
  * **Requisições HTTP:** [Axios](https://axios-http.com/)
  * **Notificações:** [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
  * **Gerenciamento de Estado:** React Context API 

## 🛠️ Pré-requisitos

  * Node.js (versão 18.x ou superior)
  * NPM, Yarn ou PNPM

## ⚙️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-frontend-cafeteria.git
    cd seu-frontend-cafeteria
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

    *(ou `yarn install`, `pnpm install`)*

3.  **Configure as Variáveis de Ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.local.example`:

    ```bash
    cp .env.local.example .env.local
    ```

    Abra o arquivo `.env.local` e configure a URL da sua API backend. O prefixo `NEXT_PUBLIC_` é **obrigatório** para que a variável seja acessível no navegador.

    ```ini
    # .env.local
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
    ```

## 🚀 Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes comandos:

  * **`npm run dev`**
    Inicia o servidor de desenvolvimento em `http://localhost:3000`.

  * **`npm run build`**
    Gera a build de produção da aplicação.

  * **`npm run start`**
    Inicia um servidor de produção com a build gerada anteriormente.

  * **`npm run lint`**
    Executa o linter para analisar e corrigir problemas de padrão de código.

## 📂 Estrutura do Projeto (Exemplo)

A estrutura de pastas segue as convenções do Next.js com App Router para organização e escalabilidade.

```
/
├── app/
│   ├── login/page.tsx
│   └── register/page.tsx
│   ├── (protected)/        # Grupo de rotas protegidas por login
│   │   ├── buys/page.tsx
│   │   ├── products/page.tsx
│   │   ├── sells/page.tsx
│   │   └── layout.tsx        # Layout que verifica a autenticação
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página inicial
├── components/             # Componentes React reutilizáveis (botões, inputs, etc.)
├── lib/                    # Funções utilitárias, hooks, instância do Axios
├── public/                 # Arquivos estáticos (imagens, fontes)
└── ...
```
