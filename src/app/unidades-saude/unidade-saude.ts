import { Endereco } from './endereco/endereco';
import { Medico } from '../medico-panel/medico';

export interface UnidadeSaude {
    id: number;
    endereco: Endereco;
    nome: string;
    tipo: string;
    medicos: Medico[];
}
