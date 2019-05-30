import { User } from './User';

export class Fatura {

    _id: string;
    user: User;
    nome_empresa: String;
    valor: Number;
    data_vencimento: Date;
    pagou: Boolean;
}
