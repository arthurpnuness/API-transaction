import { Request, Response, Router } from 'express';
import { UserController } from '../controller/UserController';
import { ValidationFilter } from '../validation/ValidationFilter';

//Neste trecho de code define uma instancia de usercontroller para lidar com as solicitações feitas 
const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', (_req: Request, res: Response) => {
	res.send("pumping API!");
});

userRoutes.get('/users', userController.GetAll.bind(userController));
userRoutes.get('/users/:id', ValidationFilter.CheckUser, userController.GetById.bind(userController));
userRoutes.post('/users', ValidationFilter.CheckRequiredFields, userController.Create);
userRoutes.delete('/users/:id', ValidationFilter.CheckUser, userController.Destroy);
userRoutes.put('/users/:id', ValidationFilter.CheckUser, ValidationFilter.CheckEmail, userController.Update);

export default userRoutes;

/**
  O código define as seguintes rotas:

Uma rota inicial para testar se a API está funcionando corretamente.
Uma rota para obter todos os usuários.
Uma rota para obter um usuário específico pelo seu ID.
Uma rota para criar um novo usuário.
Uma rota para excluir um usuário pelo seu ID.
Uma rota para atualizar um usuário pelo seu ID.

O code usa o middleware ValidationFilter para validar algumas solicitações antes de passá-las para o UserController. 
 */