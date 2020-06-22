const express = require('express')
const routes = express.Router();
const validateToken = require('../../config/util').validateToken;

const UserController = require('../controller/UserController');
const ProductController = require('../controller/ProductController');
const EstoqueController = require('../controller/EstoqueController');
const MovimentacaoController = require('../controller/MovimentacaoController');

// Rotas de usuario
routes.get('/user/:id', validateToken, UserController.show); //Buscar
routes.post('/user', validateToken, UserController.store); //Criar
routes.put('/user/:id', validateToken, UserController.update); //Editar
routes.delete('/user/:id', validateToken, UserController.delete); //Deletar
routes.post('/auth', UserController.auth); //Basic authentication

// Rotas de produtos
routes.get('/product/:recordsPerPage/page/:page', ProductController.index); //Listar todos
routes.get('/product/:nome', ProductController.searchLike); //Pegar pelo nome
routes.get('/product/:codigo', ProductController.searchByCode); //Pegar pelo nome
routes.post('/product', ProductController.store); //Criar

routes.get('/estoque/:recordsPerPage/page/:page',  EstoqueController.index); //Listar todos

//Movimentacao
routes.get('/movimentacao/:recordsPerPage/page/:page', MovimentacaoController.relatorio); //Listar todos
//movimentacao{idProduto,tamanho,quantidade,valor,tipo,devolucao,usuario}
routes.post('/movimentacao/', MovimentacaoController.novaMovimentacao); //Criar

module.exports = routes;