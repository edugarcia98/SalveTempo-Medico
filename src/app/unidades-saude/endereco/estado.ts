import { Pais } from './pais';

export interface Estado {
    id: number;
    pais: Pais;
    sigla: string;
    nome: string;
}
