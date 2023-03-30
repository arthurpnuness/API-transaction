export class EmailRegisteredError extends Error {
	public message = 'Email not available';
}

//A classe é usada para representar um erro em que um determinado endereço de e-mail já está em uso.