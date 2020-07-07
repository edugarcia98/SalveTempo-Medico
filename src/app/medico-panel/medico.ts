import { User } from '../cadastro-medico/user';
import { Especializacao } from '../especializacao/especializacao';

export interface Medico {
    id: number;
    usuario: User;
    especializacao: Especializacao;
    nome: string;
    sexo: string;
    dataNasc: Date;
    crm: string;
}
