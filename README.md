# Projeto EnaFood

## Foi utilizado para contrução:
- API -> Node.js;
- FRONT -> React;
- DB -> MongoDB;

## Estrutura da base de dados:
- `Cliente (Customer):`
    - `name: String`
    - `address: String`
    - `email: String`
    - `password: String`
    - `access: String`
- `Produto (Product):`
    - `name: String`
    - `desc: String`
    - `quantity: Number`
    - `price: Number`
    - `image: String`
- `Pedido (Order):`
    - `customer: String`
    - `list: [{
            product: String,
            quant: Number,
            price: Number
        }]`
    - `total: Number`
    - `pay: String`
    - `date: Date`

## Instalação
- `/web e /api -> npm i`;

## Inicialização
- `/web e /api -> npm start`;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/ecommerce/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/ecommerce/blob/main/web/src/api.js);

### a aplicação pode ser acessada através do link:
- http://ecomm-mongodb-node.s3-website-us-east-1.amazonaws.com
- `FRONT armazenado em instância Amazon S3`;
- `API instanciado em EC2 AWS (http://34.235.154.60:3003)`;

### Implementações API:
- `Utilização de models mongoose para Clientes, Produtos e Pedidos`;
- `Rotas de acesso (para os métodos GET, POST, DELETE E PATCH):`;
    - `{baseURL}/customer -> retorna, atualiza, exclui clientes`;
    - `{baseURL}/product -> retorna, atualiza, exclui produtos`;
    - `{baseURL}/order -> retorna, atualiza, exclui pedidos`;
    - `{baseURL}/{rota}/:id -> retorna registro por ID`;
- `após inserção de pedidos, a quantidade de produtos é atualizada`;

### Implementações FRONT:
- `Cadastro, alteração e exclusão de Cliente`;
- `Cadastro, alteração e exclusão de Produto`;
- `Lista Clientes`;
- `Lista Produtos`;
- `Lista Pedidos`;
- `Carrinho`;
- `Login`;

### Próximos passos:
- `Filtrar listagens`;
- `Localizar registros por campo`;
- `Utilizar localstorage (pedidos) concomitante ao ContextAPI`;
- `Lista pedidos detalhada`;
- `Validação dos campos`;
- `Refatoração`;
