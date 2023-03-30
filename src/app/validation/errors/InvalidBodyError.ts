export class InvalidBodyError extends Error {
	constructor(public message: string) {
		super();
		this.message = message;
	}
}

// Essa classe é usada para representar um erro de requisição com corpo inválido