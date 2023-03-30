import { NotFoundError } from '../../app/validation/errors/EntityNotFoundError';
import { IRepository } from '../../domain/contract/IRepository';
import { Entity } from "../../domain/model/Entity";

export abstract class Repository<T extends Entity> implements IRepository<T> {
//essa classe implementa a interface IRepository que contem os metodos para operações da leitura e escrita
	protected db: T[] = [];

	private entityName: string;

	constructor(initialDb: T[], entityName: string) {
		this.db = initialDb;
		this.entityName = entityName;
	}

	public GetAll(): T[] { //o método GetAll() retorna todas as entidades do repositório,
		return this.db;
	}

	public GetById(id: string): T { // o método GetById retorna a entidade do repositório com o ID correspondente ao valor do parâmetro id
		const entity = this.db.find(entity => entity.Id === id);
		if(!entity) throw new NotFoundError(this.entityName);

		return entity;
	}

	public Add(entity: T) { //o método Add adiciona uma nova entidade ao repositório 
		this.db.push(entity);
	}

	public Remove(id: string) {
		// o método Remove(id: string) remove uma entidade do repositório com o ID correspondente ao valor do parâmetro id.
		for(let i = 0; i < this.db.length; i++) {
			if(this.db[i].Id === id) {
				this.db.splice(i, 1);
				return true;
			}
		}

		throw new NotFoundError(this.entityName);
	}
}