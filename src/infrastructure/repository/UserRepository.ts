import { RequiredFieldMissingError } from '../../app/validation/errors/RequiredFieldMissingError';
import { InvalidPropertyTypeError } from '../../app/validation/errors/InvalidPropertyTypeError';
import { EmailRegisteredError } from "../../app/validation/errors/EmailRegisteredError";
import { NotFoundError } from '../../app/validation/errors/EntityNotFoundError';
import { InvalidBodyError } from '../../app/validation/errors/InvalidBodyError';
import { IUserRepository } from '../../domain/contract/IUserRepository';
import { Transaction } from '../../domain/model/Transaction';
import { Repository } from "./Repository";
import { User } from "../../domain/model/User";
import transactionsDB from '../db/transactions';

export class UserRepository extends Repository<User> implements IUserRepository {
//adiciona metodos especificos para a logica de negocios dos usuarios e transações do mesmo.
//recebe trambem uma lista inicial de user e passa esses user para o construtor da classe
	constructor(initialDb: User[]){
		super(initialDb, 'usuário');
		this.initDefaultTransactions();		
	}

	/* #region User Logic */
	public Create(name: string, cpf: string, email: string, age: number){		
		const newUser = new User(name, cpf, email, age);
		this.Add(newUser);

		return newUser;
	}

	public Update(id: string, data: {name: string, email: string}) {
		const user = this.GetById(id);

		if(data.email) user.setEmail(data.email);
		if(data.name) user.setName(data.name);

		return user;
	}
	private AddTransaction(user: User, transaction: Transaction) {
		user.Transactions.push(transaction);
	}	

	public GetTransactionById(userId: string, transactionId: string) {
		const user = this.GetById(userId);
		const transaction = user.Transactions.find(transaction => transaction.Id === transactionId);
		if(!transaction) throw new NotFoundError('transação');

		return transaction;
	}

	public GetAllTransactionsFromUser(userId: string) {
		const user = this.GetById(userId);
		return user.Transactions;
	}

	public CreateTransaction(userId: string, transactionData: {title: string, value: string, type: 'EXIT' | 'PROHIBITED'}) {
		const requiredFields = ['title', 'value', 'type'];
		[transactionData.title, transactionData.value, transactionData.type].forEach((requiredField, index) => {
			if(!requiredField) throw new RequiredFieldMissingError(requiredFields[index]);
			
		});

		if(isNaN(Number(transactionData.value))) throw new InvalidPropertyTypeError('value');
		if(!['EXIT', 'PROHIBITED'].includes(transactionData.type)) throw new InvalidPropertyTypeError('type');

		const newTransaction = new Transaction(transactionData.title, Number(transactionData.value), transactionData.type);

		this.AddTransaction( 
			this.GetById(userId),
			newTransaction
		);

		return newTransaction;
	}

	public RemoveTransaction(userId: string, transactionId: string) {
		const user = this.GetById(userId);

		for(let i = 0; i < user.Transactions.length; i++) {
			if(user.Transactions[i].Id === transactionId) {
				user.Transactions.splice(i, 1);
				return transactionId;
			}
		}

		throw new NotFoundError('transaction');
	}

	public UpdateTransaction(userId: string, transactionId: string, transactionData: { title: string, value: string, type: 'PROHIBITED' | 'EXIT' }) {
		const transaction = this.GetTransactionById(userId, transactionId);

		if(!transactionData.title && !transactionData.value && !transactionData.type) throw new InvalidBodyError('Transaction properties missing from submitted object.');
		if(transactionData.type && !['EXIT', 'PROHIBITED'].includes(transactionData.type)) throw new InvalidPropertyTypeError('type');
		if(transactionData.value && isNaN(Number(transactionData.value))) throw new InvalidPropertyTypeError('value');

		if(transactionData.title) transaction.title = transactionData.title;
		if(transactionData.value) transaction.value = Number(transactionData.value);
		if(transactionData.type) transaction.type = transactionData.type;

		return transaction;
	}
	private findByEmail(email: string) {
		return this.db.find(user => user.Email === email);
	}

	public emailRegistered(email: string) {
		return this.db.find(user => user.Email === email) !== undefined;
	}

	public emailRegisteredByAnotherId (email: string, interestedId: string) {
		const foundUser = this.findByEmail(email);
		if(foundUser !== undefined && foundUser.Id !== interestedId) {
			throw new EmailRegisteredError();
		}

		return false;
	}

	public cpfRegistered(cpf: string) {
		return this.db.find(user => user.Cpf === cpf) !== undefined;
	}

	private initDefaultTransactions() {
		transactionsDB.forEach(transaction => {
			this.AddTransaction(this.db[0], transaction);
		});
	}
}