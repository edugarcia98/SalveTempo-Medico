import { User } from 'src/app/autenticacao/cadastro-medico/user';
import { UnidadeSaude } from '../unidades-saude/unidade-saude';
import { Medico } from '../medico-panel/medico';
import { Especializacao } from '../especializacao/especializacao';

export interface Paciente {
    id: number;
    usuario: User;
    nome: string;
    sexo: string;
    dataNasc: Date;
}

export interface Sintoma {
    id: number;
    nomecsv: string;
    nome: string;
}

export interface Doenca {
    id: number;
    nome: string;
    especializacoes: Especializacao[];
}

export interface Consulta {
    id: number;
    paciente: Paciente;
    unidadeSaude: UnidadeSaude;
    medico: Medico;
    diagnostico: Doenca;
    data: Date;
    periodo: string;
    percentual_assertividade_prognostico: number;
    observacao: string;
    status: string;
    sintomas: Sintoma[];
    prognosticos: Doenca[];

    //variáveis fora do JSON
    formattedId: string;
    completePeriodo: string;
}

export interface ConsultaSintoma {
    id: number;
    consulta: Consulta;
    sintoma: Sintoma;
    possui: number;

    //variáveis fora do JSON
    possuiDescription: string;
}

export interface Prognostico {
    id: number;
    consulta: Consulta;
    doenca: Doenca;
    percentual: number;

    //variáveis fora do JSON
    rgbColor: string;
}