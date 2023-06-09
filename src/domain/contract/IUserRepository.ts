import { Transaction } from "../model/Transaction";
import { User } from "../model/User";

export interface IUserRepository {
	Create(name: string, cpf: string, email: string, age: number): User;
	Update(id: string, data: {name: string, email: string}): User;
	GetTransactionById(userId: string, transactionId: string): Transaction;
	GetAllTransactionsFromUser(userId: string): Transaction[];
	CreateTransaction(userId: string, transactionData: {title: string, value: string, type: 'EXIT' | 'PROHIBITED'}): Transaction;
	RemoveTransaction(userId: string, transactionId: string): string;
	UpdateTransaction(userId: string, transactionId: string, transactionData: { title: string, value: string, type: 'PROHIBITED' | 'EXIT' }): Transaction;
}

//Neste code é definida a interface que especifica um conjunto de métodos da classe que precisa implementar 