# Projeto Ecommerce

## Foi utilizado para contrução:
- API -> Node.js;
- FRONT -> React;
- DB -> MongoDB;
- Ferramentas:
    - Visual Studio Code 1.71.2;
    - Console de Gerenciamento da AWS;

&nbsp;

## Estrutura da base de dados:

- Cliente (Customer):
```javascript
    name: String,
    address: String,
    email: String,
    cpf: String,
    phone: String,
    birth: Date,
    password: String,
    access: String
```

- Produto (Product):
```javascript

    sku: String,
    name: String,
    desc: String,
    quantity: Number,
    price: Number,
    image: String
```

- Pedido (Order):
```javascript
    customer: ObjectId,
    list: [{
        product: String,
        quantity: Number,
        price: Number,
        total: Number,
    }],
    total: Number,
    payment: String,
    date: Date
```

&nbsp;

## Instalação
- /web e /api -> npm i;

&nbsp;

## Inicialização
- /web e /api -> npm start;
- porta padrão API: 3003;
- porta padrão WEB: 3000;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/ecommerce/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/ecommerce/blob/main/web/src/api.js);

&nbsp;

### a aplicação pode ser acessada através do link:
- http://ecomm-mongodb-node.s3-website-us-east-1.amazonaws.com
- FRONT armazenado em instância Amazon S3;
- API instanciado em EC2 AWS (http://34.235.154.60:3003);

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/bis2bis-universities/blob/main/samples/universities.postman_collection.json); ATENÇÃO! ALTERAR

- Utilização de models mongoose para Clientes, Produtos e Pedidos;

- POST
    - {baseURL}/universities/create -> cria lista de universidades a partir da configuração inicial;
    - {baseURL}/universities -> cadastra universidade;

- GET
    - {baseURL}/universities -> retorna todos os registros;
    - {baseURL}/universities/{id} -> retorna registro por id;
    - {baseURL}/universities?page={page} -> retorna registros por paginação;
    - {baseURL}/universities?name={name} -> retorna registros por nome;
    - {baseURL}/universities?country={country} -> retorna registros por país;
    - {baseURL}/universities?country={country}&name={name} -> retorna registros por país e nome;
    - {baseURL}/universities?page={page}&country={country}&name={name} -> retorna registros por paginação, país e nome;
    - {baseURL}/universities/countries -> lista todos os países das universidades cadastradas na base de dados;

- PUT
    - {baseURL}/universities/{id} -> atualiza registro;

- DELETE
    - {baseURL}/universities/{id} -> exclui registro;

- Inserção de pedidos:
    - total do pedido e data e hora atual inseridos através da API;
    - a quantidade de produtos é atualizada de forma automatizada (é verificado se a quantidade solicitada é igual ou menor que o estoque);

&nbsp;

#### exemplo de inserção de Clientes

```javascript
{
    "name": "Test Client",
    "cpf": "99999999999",
    "email": "client@test.com",
    "address": "Test Street, 95",
    "phone": "(99) 99999-9999",
    "birth": "1999-01-01",
    "password": "123"
}
```

#### exemplo de inserção de Produtos

```javascript
{
    "sku": "888",
    "name": "Product Test",
    "price": 99.9,
    "quantity": 30
}
```

#### exemplo de inserção de Pedidos

```javascript
{
    "customer": 3,
    "address": "Payment Street",
    "payment": "pix",
    "items": [
        {
            "quantity": 2,
            "sku": "888"
        },
        {
            "quantity": 2,
            "sku": "999ab"
        }
    ]
}
```

&nbsp;

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
