import { Transaction } from "../../domain/model/Transaction";

//o code exporta a lista de transações denominada transactionsDB
const transactionsDB: Transaction[] = [
//a lista contem cinco instancias de OBJ | cada uma com um titulo, valor, tipoe(entrada ou saida) e um ID unico fornecido no momento da criação

	new Transaction('Payment', 5500, 'PROHIBITED', '829dc216-48d7-423f-8fe6-5f7c266bd84a'),
	new Transaction('Shopping', 2900, 'EXIT', 'a078df66-4c86-4e8d-8d10-b31d2862b88e'),
	new Transaction('Gasoline', 1890, 'EXIT', 'ab7c2a5a-6061-45a1-aa43-9ee7fce84c63'),
	new Transaction('Market', 2506, 'EXIT', 'd7abec52-1428-4943-8098-6685561553c9'),
	new Transaction('Payment', 10010, 'PROHIBITED', 'b0c00400-4fe7-4014-b800-26f374475c11')
]

export default transactionsDB;