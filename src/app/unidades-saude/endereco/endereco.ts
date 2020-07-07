import { Cidade } from './cidade';

export interface Endereco {
    id: number;
    cidade: Cidade;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento;
}
