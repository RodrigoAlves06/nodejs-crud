# nodejs-crud
Crud Completo (GET - POST - PUT - DELETE) Rest API

Este repositorio apresenta de maneira simples como criar uma API Rest.

Nesta aplicação, utilizamos o arquivo principal do servidor node na pasta src/index.js

Vamos trabalhar com um array de "projects" com os campos: Id, title e owner.
Toda vez que é criado um project, uma ID é gerada, para criação da ID foi utilizado uuidv4.

Aplicação contém uma Function para criação do log de cada requisição realizada pelo usuário, essa Function se encontra na linha 13.

Aplicação contém na rota get uma filter, assim o usuário não precisa fornecer exatamente o nome da title cadastrada, é possível buscar
sem estar todo preenchido. A rota se encontra na linha 39.

Em cada rota da aplicação é retornado o status 400 se algo não for encontrado.

Na linha 97 se encontra a posta que está sendo utilizada para o servidor node, porta criada na aplicação é 3333.



