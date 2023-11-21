# API do Financial App
  API de controle e gestão de cobranças.

## 🔧 Instalação e Configuração ⚙️
- Siga os seguintes passos:
1. Abra o terminal e clone este repositório para sua máquina com o seguinte comando:
```bash
git clone https://github.com/alissonromaosantos/desafio-back-end-M06.git
```

2. Navegue até a pasta do projeto com o comando:
```bash
cd desafio-back-end-M06
```

3. Abra o projeto no seu VsCode (Se não tiver instalado, instale-o [aqui!](https://code.visualstudio.com/download)):
```bash
code .
```

4. Renomei o arquivo **.env.example** para **.env**
 
5. Preencha as informações do arquivo .env de acordo com as configurações do seu banco de dados PostgreSQL

6. No arquivo .env preencha o **JWT_SECRET** com a sua chave JWT secreta
 
7. Verifique se você possui o Node.js instalado em sua máquina, caso não instale-o,  [Baixe o Node.js aqui!](https://nodejs.org)

8. Instale as dependências do projeto com o comando:
```bash
npm install
```

9. Rode o seguinte comando para inicializar o servidor:
```bash
npm run start
```
  
## 📡 Rotas
### Usuário
- Listagem de usuário:
```js
routes.get("/user");
```

- Cadastro de usuário:
```js
routes.post("/sign-up");
```

- Login de usuário:
```js
routes.post("/sign-in");
```

- Atualização de usuário:
```js
routes.put("/user");
```

### Cliente
- Cadastro de cliente:
```js
routes.post("/customer");
```

- Atualização de cliente:
```js
routes.put("/customer/:id");
```

- Listagem de clientes:
```js
routes.get("/customer");
```

- Detalhamento do cliente:
```js
routes.get("/customer/detail/:id");
```

### Cobranças
- Cadastro de cobrança:
```js
routes.post("/charges");
```

- Listagem de cobranças:
```js
routes.get("/charges");
```

- Atualização de cobranças:
```js
routes.put("/charges/:id");
```

- Exclusão de cobranças:
```js
routes.delete("/charges/:id");
```

- Detalhar cobranças:
```js
routes.get("/charges/:id");
```

## 🆕 Funcionalidades
- Usuários:
1. Cadastrar usuários
2. Login de usuários
3. Atualização de usuários
4. Listagem de usuários

- Clientes:
1. Cadastrar clientes
2. Atualizar clientes
3. Listar clientes
4. Detalhar clientes

- Cobranças:
1. Cadastrar cobranças
2. Listar cobranças
3. Atualização de cobranças
4. Exclusão de cobranças
5. Detalhar cobranças

## Tecnologias
- Node.js
- Express.js
- Knex.js
- Joi
- PostgreSQL
  
## 🚀 Deploy
- Link da API em produção:
```text
https://financial-app-j6na.onrender.com/
```

&copy; MIT License 2023, feito com ❤️ pelos nossos colaboradores.
