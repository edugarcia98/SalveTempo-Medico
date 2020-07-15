import { User } from 'src/app/autenticacao/cadastro-medico/user';
import { UnidadeSaude } from 'src/app/medico/unidades-saude/unidade-saude';

export interface AdminUnidadeSaude {
    id: number;
    usuario: User;
    unidadeSaudeResponsavel: UnidadeSaude;
    nome: string;
    sexo: string;
    dataNasc: Date;
}
