### instalar os pacotes 
```js
npm i
```
### Copiar .env
```bash
cp .env.example .env
```
- verificar as credenciais para o banco Postgres (se for usar o exemplo abaixo do docker não é preciso alterar)
- verificar as credenciais para o envio de e-mail o drive esta setado para trabalhar com smtp, mas este boilerplate já está pre-configurado com `aws-sdk` para utilizar o SES para isso altere as variáveis  `MAIL_CONNECTION=ses` e `SES_` com as chaves IAM de privilégio para utilizar o SES

### Docker containers
 * postgres
```
docker run --name postgis -e POSTGRES_PASSWORD=docker -p 5432:5432 -d -t kartoza/postgis
```
 * redis ( Throttle )
```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
### Docker compose
 * uma opção para usar produção. Se não for um Cloud DB uses ese essa opção para persistir os dados.
 * configure as variáveis de ambiente em: docker/.env Informe o nome, usuário e senha do banco.
 ```
 cd docker
 
 docker-compose up -d 
 ``` 

### Se vc não optou em rodar o Docker Compose será preciso Criar a Database
`usar o nome especificado no .env DB_DATABASE=adonis`

> Eu tenho utilizado o [DBeaver](https://dbeaver.io/download/) Free Universal Database Tool

### Gerar uma chave para o projeto
```js
adonis key:generate
```

### Alterar as credenciais do Usuário admin
em: `database/seeds/010_UserAdminSeeder.js`
```js
...
const user = await Factory.model('App/Modules/Users/Models/User').make({
  email: 'izidoriojr@gmail.com',
  password: '123456',
  ...timestamps,
});
...
```

### Rodar as migrations e seed
```bash
adonis migration:run --seed
```
### Levantar o servidor
```bash
adonis serve --dev
```
### Se você usa o [Insomnia](https://insomnia.rest/) importe .json com as principais rotas
de: `insomnia/Insomnia.json`
