import { v4 as uuid } from 'uuid';

export class Entity {
	private id: string;

	constructor(id: string = uuid()){
		this.id =id;
	}

	get Id(){
		return this.id;
	}
}

//o code aqui prescrito defina uma classe que tem um construtor que cria uma intancia com um id gerado automaticamente usando a biblioteca UUI