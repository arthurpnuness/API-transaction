import { Transaction } from "./Transaction";
import { Entity } from "./Entity";

//aqui é onde define a classe user que se estende a Entity. 

export class User extends Entity {
	private transactions: Transaction[];

	constructor(
//Ela possui quatro propriedades privadas: name, cpf, email e age
		private name: string,
		private cpf: string,
		private email: string,
		private age: number,
		id?: string
	){
		super(id);
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.age = age;
		this.transactions = [] //possui este array de transações privado
	}


//os gets abaixo foram feitos para retornar os valores das propriedades e metodos
	get Name(){
		return this.name;
	}

	get Cpf(){
		return this.cpf;
	}

	get Email(){
		return this.email;
	}

	get Age() {
		return this.age;
	}

	get Transactions(){
		return this.transactions; //classe também tem este metodo para retornar todas as transações relacionadas ao usuário
	}

	setName(newName: string) {
		this.name = newName;
	}

	setEmail(newEmail: string) {
		this.email = newEmail;
	}
}