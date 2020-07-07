import { Estado } from './estado';

export interface Cidade {
    id: number;
    estado: Estado;
    nome: string;
    latitude: number;
    longitude: number;
}
