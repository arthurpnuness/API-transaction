export class CpfRegisteredError extends Error {
	public message = 'cpf is already in use';
}

//a classe é usada para representar um erro personalizado quando um CPF já está sendo usado por outro usuário