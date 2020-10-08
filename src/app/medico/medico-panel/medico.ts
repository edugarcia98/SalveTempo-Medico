import { User } from 'src/app/autenticacao/cadastro-medico/user';
import { Especializacao } from '../especializacao/especializacao';

export interface Medico {
    id: number;
    usuario: User;
    especializacao: Especializacao;
    nome: string;
    sexo: string;
    sexoStr: string;
    dataNasc: Date;
    crm: string;
}
