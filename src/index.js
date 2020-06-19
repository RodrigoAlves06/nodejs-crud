const express = require('express'); // Importando o express da biblioteca
const {uuid, isUuid} = require('uuidv4');
const cors = require('cors');
const server = express(); // passando os metodo express para variavel server.


server.use(cors());
server.use(express.json()); // permitir receber parametros em json.

const projects = [];

// middlewares
function logRequests(req,res,next){
  const {method, url} = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();

  console.timeEnd(logLabel);
}

function validaProjectId(req,res,next){
  const {id} = req.params;

  if (!isUuid(id)){
    return res.status(400).json({error: 'Invalid project id'});
  }

  return next();
}

server.use(logRequests); // foi adicionado em todas as rotas, porque não é passado nenhum caminho.
server.use('/projects/:id', validaProjectId); // middleware só vai ser validado nessa rota.


// .get ele busca uma informação para o usuário.
server.get('/projects', (req,res)=>{
  const {title} = req.query;
  const results = title 
  ? projects.filter(project => project.title.includes(title)) // se ele encontrar um valor igual ao que foi passado do paramentro
  : projects; // se não result vai receber projects
  return res.json(results);
});

// .post cria uma informação fornecida pelo usuário.
server.post('/projects', (req,res)=>{
  const {title , owner} = req.body;

  const project = {id: uuid(),title, owner};
  projects.push(project);

  
  return res.json(project);

});

// .put altera uma informação fornecida pelo usuário.
server.put('/projects/:id', (req, res)=>{
  const {id} = req.params;
  const {title , owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return res.status(400).json({ error: 'Project not found.'})
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return res.json(project);

});
// .delete excluí uma informação fornecida pelo usuário.
server.delete('/projects/:id', (req,res)=>{
  const {id} = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0){
    return res.status(400).json({error:'Project nor found.'})
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send({message:'Excluído com sucesso'});
});

// rotas put e delete estão passando :id pois será os parametros recebidos.








server.listen(3333); // criando uma porta para ser executada o projeto NodeJs