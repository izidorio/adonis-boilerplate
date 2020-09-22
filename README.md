### instalar os pacotes 
```js
npm i
```
### Copiar .env
```bash
cp .env.example .env
```
- verificar as credenciais para o banco (se for usar o exemplo abaixo do docker não é preciso alterar)
- verificar as credenciais para o envio de e-mail

### Exemplo com o Docker
```
docker run --name postgis -e POSTGRES_PASSWORD=docker -p 5432:5432 -d -t kartoza/postgis
```

### Criar a Database
`usar o nome especificado no .env DB_DATABASE=adonis`

### Gerar uma chave para o projeto
```js
adonis key:generate
```

### Alterar as credenciais do Usuário admin
em: `database/seeds/AclUserAdminSeeder.js`
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
