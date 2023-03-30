export class InvalidPropertyTypeError extends Error {
	constructor(property: string){
		super();
		this.message = `Property  '${property}' with invalid format.`;
	}
}

//classe representa um erro que ocorre quando uma propriedade de um objeto tem um formato inválido.