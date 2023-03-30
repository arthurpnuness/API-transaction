export class NotFoundError extends Error {
	constructor(entityName: string){
		super();
		this.message = `No  ${entityName} associated with the given id.`;
	}
}

//Quando essa classe é instanciada com o nome de uma entidade como argumento, ela retorna uma mensagem de erro indicando que não foi encontrada nenhuma instância da entidade com o ID fornecido