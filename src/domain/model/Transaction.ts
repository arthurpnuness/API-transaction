import { Entity } from "./Entity";

export class Transaction extends Entity {
	constructor(		
		public title: string,
		public value: number,
		public type: 'PROHIBITED' | 'EXIT',
		id?: string
	){
		super(id);
		this.title = title;
		this.value = value;
		this.type = type;
	}
}

//Aqui é prescrito o code que define uma classe que se estenda a classe abstrata ENTITY. A classe criada tem quatro propriedades públicas: title, value, type e id. Logo após ele espera três argumetnos title (string), value (number) e type (string) e um quarto argumento opcional id (string).