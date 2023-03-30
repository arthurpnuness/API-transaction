import { badRequest, internalError, notFound, success } from "../helper/httpResponses";
import { RequiredFieldMissingError } from "../validation/errors/RequiredFieldMissingError";
import { InvalidPropertyTypeError } from "../validation/errors/InvalidPropertyTypeError";
import { NotFoundError } from "../validation/errors/EntityNotFoundError";
import { Request, Response } from "express";
import { InvalidBodyError } from '../validation/errors/InvalidBodyError';
import { userRepository } from "..";

export class TransactionController {
	public Create(req: Request, res: Response){ //aqui receba a solicitação e uma resposta como parametros  
		const { title, value, type } = req.body;
		const userId = req.params.userId;

		try { //Ela vai tentar criar a transação chamando o método CreateTransaction do usuário e retornar uma respota de sucesso
			return success(
				res, { 
					status: 'created',
					transactionCreated: userRepository.CreateTransaction(userId, {title, value, type})
			 	}
			);
		} catch (error) { 
			if(error instanceof RequiredFieldMissingError || error instanceof InvalidPropertyTypeError) return badRequest(res, error.message);
			if(error instanceof NotFoundError) return notFound(res, error.message);
		}//Se ocorrer um erro o code trata o mesmo verificando se é uma instancia  de RequiredFieldMissingError, InvalidPropertyTypeError ou NotFoundError, e retorna uma resposta 
	}

	public GetById(req: Request, res: Response) { //aqui receba a solicitação e uma resposta como parametros   
		const {userId, id: transactionId} = req.params; //função verifica o ID do user e o ID da transação 
		if(!userId) return badRequest(res, 'User id not found.');
		if(!transactionId) return badRequest(res, 'Transaction id not found.');

		try { //aqui tenta obter a transação chamando o método e retorna uma resposta 
			return success(res, userRepository.GetTransactionById(userId, transactionId));
		} catch (error) {
			if(error instanceof NotFoundError) return notFound(res, error.message);
			return internalError(res);
		}
	}

	public GetAllTransactionsFromUser(req: Request, res: Response) {
//aqui denovo recebe a solicitação da request e a response. Responsavel por obter todas as transações do user com base no id
		const userId = req.params.userId;
		
		if(!userId) return badRequest(res, 'Transaction id not found.');
//A função verifica se o ID do user foi fornecida. Caso o Id do user esiver faltando, função retorna um erro(badRequest)
		try {
			const transactions = userRepository.GetAllTransactionsFromUser(userId);
//A função tentar obter todas as transações do user chamando o método GETALLTRANSACIIONSFROMUSER
			const response = {
				transactions,
				balance: transactions.reduce((acc, currentTransaction) => {
//Para calcular o saldo total, a função usa o reduce para iterar sobre todas as transações e acumular o saldo
					if(currentTransaction.type === 'PROHIBITED') {
						return {
							...acc,
							prohibited: acc.appetizer += currentTransaction.value,
							balance: acc.balance += currentTransaction.value
						}
					} 

					return {
						...acc,
						outings: acc.outings += currentTransaction.value,
						balance: acc.balance -= currentTransaction.value
					}
				}, {
					appetizer: 0,
					outings: 0,
					balance: 0
				})
			}

			return success(res, response);
		} catch (error) {
			if(error instanceof NotFoundError) return notFound(res, error.message);
			return internalError(res);
//Se ocorrer um erro, o código trata o erro verificando se é uma instância de NotFoundError e retorna uma resposta de erro  (notFound)
		}		
	}

	public Destroy(req: Request, res: Response) { 
//A função é responsavel por remover uma transação de um user com base nos IDs fornecidos
		const {userId, id : transactionId} = req.params;
//Código começa com a desestruturação dos parâmetros da solicitação (userId e transactionId).
		if(!userId) return badRequest(res, 'Transaction id not found.');
		if(!transactionId) return badRequest(res, 'Transaction id not found.');
//a função verifica se os IDs do usuário e da transação foram fornecidos na solicitação
		try {			
			return success(res, {status: 'removed', removedTransactionId: userRepository.RemoveTransaction(userId, transactionId)});
//função tenta remover a transação chamando o método "RemoveTransaction" do repositório de usuário (userRepository)
		} catch (error) {
			if(error instanceof NotFoundError) return notFound(res, error.message);
			return internalError(res);
//Se ocorrer um erro, o código trata o erro verificando se é uma instância de NotFoundError
		}		
	}

	public Update(req: Request, res: Response) {
//está função é responsavel por atualizar uma transação de um user com base nos IDs fornecidos nos params e nos dados da nova transação
		const {userId, id : transactionId} = req.params;
		if(!userId) return badRequest(res, 'Transaction id not found.');
		if(!transactionId) return badRequest(res, 'Transaction id not found.');

		try {
//nestre trecho do code a função tenta atualizar a transação chamadno o método updatedTransaction e passa os IDs do user e da trans juntamente com os dados atualizados da transação
			return success(res, {status: 'updated', updatedTransaction: userRepository.UpdateTransaction(userId, transactionId, req.body)});
//se ela for atualizada com sucesso a função retorna uma resposta de SUCESS
		} catch (error) {
//Mas se ouver um erro o código trata o erro verificando se é uma instância de NotFoundError, InvalidBodyError ou InvalidPropertyTypeError
			if(error instanceof NotFoundError || error instanceof InvalidBodyError || error instanceof InvalidPropertyTypeError) return notFound(res, error.message);
			return internalError(res);
		}
	}
}