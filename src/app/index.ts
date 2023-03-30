import { UserRepository } from '../infrastructure/repository/UserRepository';
import express from 'express';
import usersDB from '../infrastructure/db/users';
import userRouter from './routes/userRoutes';
import transactionRouter from './routes/transactionRoutes';

//define as rotas para os recursos de usuário e transação, e inicia o servidor na porta especificada.
const port = process.env.PORT || 8081;
const app = express();

export const userRepository = new UserRepository(usersDB);

app.use(express.json());
app.use(userRouter);
app.use(transactionRouter);

app.listen(port, () => {
	console.log(`[server] Server is running at port ${port}`);	
});
