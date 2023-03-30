export class RequiredFieldMissingError extends Error {
	constructor(field: string){
		super();
		this.message = `Required property  '${field}' missing from submitted object.`;
	}
}

// A classe define um erro de campo obrigatório faltando