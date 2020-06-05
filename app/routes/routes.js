const express = require('express')
const routes = express.Router();
const validateToken = require('../../config/util').validateToken;

const UserController = require('../controller/UserController');
const ProductController = require('../controller/ProductController');

// Rotas de usuario
routes.get('/user/:id', validateToken, UserController.show); //Buscar
routes.post('/user', validateToken, UserController.store); //Criar
routes.put('/user/:id', validateToken, UserController.update); //Editar
routes.delete('/user/:id', validateToken, UserController.delete); //Deletar
routes.post('/auth', UserController.auth); //Basic authentication

// Rotas de produtos
routes.get('/product', validateToken, ProductController.index); //Listar todos
routes.post('/product', validateToken, ProductController.store); //Criar

module.exports = routes;