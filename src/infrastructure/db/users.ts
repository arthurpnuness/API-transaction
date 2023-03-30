import { User } from "../../domain/model/User";

//criei um array USERDB que contem objs. Cada objeto representa um usuário e tem algumas propriedades 
const usersDB: User[] = [
	new User('Helena', '23423432', 'helena@spinelli.com', 10, '1af8bf54-1894-41e8-9685-f2f5af42f7e1'),
	new User('Leandro', '63245', 'leandro@gmail.com', 51, '8cebd56d-56a0-4ef4-ac4e-8711673db21b'),
	new User('Carmem', '25468465', 'carmem@gmail.com', 56, '1e0a9bad-693b-4975-8af3-7b75c8932a3a'),
	new User('Davi', '1234567894', 'davi@gmail.com', 17, '1e750e86-61b3-4774-82f0-8733eae9f37b'),
];

export default usersDB;