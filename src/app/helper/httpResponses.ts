import { Response } from "express"

//Aqui é o conjuntos das funções que são usadas para retornar as respostas HTTP no aplicativo Express

/**
 * @returns  retorna uma resposta com o status 200 (OK) e um objeto de dados como corpo da resposta.
 */
export const success = (res: Response, data: any) => {
	return res.status(200).json(data);
}

/**
 * @returns  retorna uma resposta com o status 200 (OK) e um objeto de dados como corpo da resposta.
 */
export const badRequest = (res: Response, message: string) => {
	return res.status(400).json({message});
}

/**
 * @returns  retorna uma resposta com o status 200 (OK) e um objeto de dados como corpo da resposta.
 */
export const notFound = (res: Response, message: string) => {
	return res.status(404).json({message});
}

/**
 * 
 * @returns retorna uma resposta com o status 500 (Internal Server Error) e uma mensagem de erro genérica.
 */
export const internalError = (res: Response) => {
	return res.status(500).json({message: 'Erro no servidor. Tente novamente.'});
}