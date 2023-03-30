export interface IRepository<T> {
	GetAll(): T[];
	GetById(id: string): T;
	Add(entity: T): void;
	Remove(id: string): boolean;
}
// este code define uma interface genérica que define esses quatro métodos acima