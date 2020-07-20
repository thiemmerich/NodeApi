const express = require('express');
const routes = express.Router();
const validateToken = require('../../config/util').validateToken;

const UserController = require('../controller/UserController');
const ProductController = require('../controller/ProductController');
const EstoqueController = require('../controller/EstoqueController');
const MovimentacaoController = require('../controller/MovimentacaoController');
const PedidoController = require('../controller/PedidoController');

// Rotas de usuario
routes.post('/auth', UserController.auth); //Basic authentication
routes.get('/user/:id', validateToken, UserController.show); //Buscar
routes.post('/user', validateToken, UserController.store); //Criar
routes.put('/user/:id', validateToken, UserController.update); //Editar
routes.delete('/user/:id', validateToken, UserController.delete); //Deletar

// Rotas de produtos
routes.get('/product/:recordsPerPage/page/:page', validateToken, ProductController.index); //Listar todos
routes.get('/product/:nome', validateToken, ProductController.searchLike); //Pegar pelo nome
routes.get('/product/cod/:codigo', validateToken, ProductController.searchByCode); //Pegar pelo nome
routes.post('/product', validateToken, ProductController.store); //Criar

// Rotas do estoque
routes.get('/estoque/:recordsPerPage/page/:page', validateToken, EstoqueController.index); //Listar todos

//Movimentacao
routes.get('/movimentacao/:recordsPerPage/page/:page', validateToken, MovimentacaoController.relatorio); //Listar todos
//movimentacao{idProduto,tamanho,quantidade,valor,tipo,devolucao,usuario}
routes.post('/movimentacao/', validateToken, MovimentacaoController.novaMovimentacao); //Criar

// Pedidos
routes.get('/pedido/:id', validateToken, PedidoController.show); //Buscar
routes.post('/pedido', validateToken, PedidoController.gravarNovoPedido); //Salvar

module.exports = routes;