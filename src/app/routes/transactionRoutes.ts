import { TransactionController } from '../controller/TransactionController';
import { Router } from 'express';

//aqui é onde eu define as rotas da API para as operações relacionadas a transações de usuários

const transactionRouter = Router(); //cria o obj usando o Router()
const transactionController = new TransactionController();//o transactionController lida com as requisições 

//cria uma nova transação para o usuário com o ID userId.
transactionRouter.post('/user/:userId/transactions', transactionController.Create);

//retorna uma transação específica do usuário com o ID userId e o ID da transação id.
transactionRouter.get('/user/:userId/transactions/:id', transactionController.GetById);

//retorna todas as transações do usuário com o ID userId.
transactionRouter.get('/users/:userId/transactions', transactionController.GetAllTransactionsFromUser);

//retorna todas as transações do usuário com o ID userId.
transactionRouter.delete('/users/:userId/transactions/:id', transactionController.Destroy);

//atualiza uma transação específica do usuário com o ID userId e o ID da transação id.
transactionRouter.put('/users/:userId/transactions/:id', transactionController.Update);

export default transactionRouter;