# Projeto EnaFood

## Foi utilizado para contrução:
- `node.js (API)`;
- `react (FRONT)`;
- `base de dados MongoDB`;

## Instalação
- `/web e /api -> npm i`;

## Inicialização
- `/web e /api -> npm start`;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/ecommerce/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/ecommerce/blob/main/web/src/api.js);

### a aplicação pode ser acessada através do link:
- http://enafood.s3-website.us-east-2.amazonaws.com
- `FRONT armazenado em instância Amazon S3`;
- `API instanciado em EC2 AWS`;

### Implementações API:
- `Utilização de models mongoose para Clientes, Produtos e Pedidos`;
- `Rotas de acesso (para os métodos GET, POST, DELETE E PATCH):`;
    - `{baseURL}/customer -> retorna, atualiza, exlcui clientes`;
    - `{baseURL}/product -> retorna, atualiza, exlcui produtos`;
    - `{baseURL}/order -> retorna, atualiza, exlcui pedidos`;
    - `{baseURL}/{rota}/:id -> retorna registro por ID`;
- `após inserção de pedidos, a quantidade de produtos é atualizada`;

### Implementações FRONT:
- `Cadastro, alteração e exclusão de Cliente`;
- `Cadastro e exclusão de Produto`;
- `Lista Clientes`;
- `Lista Produtos`;
- `Lista Pedidos`;
- `Carrinho`;
- `Login`;

### Próximos passos:
- `Atualização de Produtos`;
- `Filtrar listagens`;
- `Localizar registros por campo`;
- `Utilizar localstorage (pedidos) concomitante ao ContextAPI`;
- `Refatoração`;
