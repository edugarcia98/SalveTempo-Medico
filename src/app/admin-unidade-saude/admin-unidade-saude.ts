import { User } from '../cadastro-medico/user';
import { UnidadeSaude } from '../unidades-saude/unidade-saude';

export interface AdminUnidadeSaude {
    id: number;
    usuario: User;
    unidadeSaudeResponsavel: UnidadeSaude;
    nome: string;
    sexo: string;
    dataNasc: Date;
}
