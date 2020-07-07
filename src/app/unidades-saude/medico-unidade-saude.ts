import { Medico } from '../medico-panel/medico';
import { UnidadeSaude } from './unidade-saude';
import { forEach } from '@angular/router/src/utils/collection';

export interface MedicoUnidadeSaude {
    id: number;
    medico: Medico;
    unidadeSaude: UnidadeSaude;
    diaPeriodoTrabalho: string;
    status: string;
}

export interface DiaPeriodoTrabalho {
    id: number;
    diaSemana: string;
    trabalha: boolean;
    manha: boolean;
    tarde: boolean;
    noite: boolean;
}

export class DiaPeriodoTrabalhoShow {
    diaSemana: string;
    periodos: string;
}