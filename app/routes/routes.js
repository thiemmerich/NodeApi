const express = require('express')
const routes = express.Router();
const UserController = require('../controller/UserController');
const validateToken = require('../../config/util').validateToken;

routes.get('/user', validateToken, UserController.index); //Listar todos
routes.get('/user/:id', validateToken, UserController.show); //Buscar
routes.post('/user', validateToken, UserController.store); //Criar
routes.put('/user/:id', validateToken, UserController.update); //Editar
routes.delete('/user/:id', validateToken, UserController.delete); //Deletar
routes.post('/auth', UserController.auth); //Basic authentication

module.exports = routes;