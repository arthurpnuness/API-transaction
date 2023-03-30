import { success } from "../helper/httpResponses";
import { Request, Response } from 'express';
import { userRepository } from '../index';
import { User } from "../../domain/model/User";

//aqui vai conter vários métodos que correspondem a diferentes endpoints da API
export class UserController{
//O método GetAll retorna uma lista de todos os usuários cadastrados na aplicação.
	public GetAll(_req: Request, res: Response) {
		const users = userRepository.GetAll().map((user: User) => this.GetUserViewModel(user));
		return success(res, users);
	}

//O método GetById retorna informações de um usuário específico com base no id fornecido.
	public GetById(_req: Request, res: Response) {
		return success(res, this.GetUserViewModel(res.locals.user));
	}

//O método Create cria um novo usuário com as informações fornecidas no corpo da solicitação.
	public Create(req: Request, res: Response) {
		const { name, cpf, email, age } = req.body;
		return success(res, { status: 'created', createdUser: userRepository.Create(name, cpf, email, age) });
	}

//O método Destroy remove um usuário específico com base no id fornecido.
	public Destroy(_req: Request, res: Response) {
		userRepository.Remove(res.locals.user.Id);
		return success(res, {status: 'removed', idRemoved: res.locals.user.Id});
	}

//O método Update atualiza as informações de um usuário específico com base no id fornecido e nas informações fornecidas no corpo da solicitação.
	public Update(req: Request, res: Response) {
		const {name, email} = req.body;
		const id = req.params.id;
		return success(res, { status: 'updated', updatedUser: userRepository.Update(id, {name, email}) });	
	}

//O método GetUserViewModel é um método auxiliar que retorna um objeto com as informações específicas de um usuário, como id, name, cpf, email e age.
	public GetUserViewModel(user: User) {
		return {
			id: user.Id,
			name: user.Name,
			cpf: user.Cpf,
			email: user.Email,
			age: user.Age
		}
	}
}