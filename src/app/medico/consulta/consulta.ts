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

export interface Anamnese {
    id: number;

    peso: number;
    altura: number;

    fuma: boolean;
    fumaStr: string;
    qtdCigarrosDia: number;

    bebe: boolean;
    bebeStr: string;
    freqBebeDiasSemana: number;

    qualidadeAlimentacaoIngestaoAgua: number;
    qualidadeAlimentacaoIngestaoAguaStr: string;

    praticaAtividadeFisica: boolean;
    praticaAtividadeFisicaStr: string;
    tipoAtividadeFisica: string;
    freqAtividadeFisicaDiasSemana: number;
    
    utilizaAnticoncepcional: boolean;
    utilizaAnticoncepcionalStr: string;
    anticoncepcionaisUtilizados: string;

    realizouGestacoes: boolean;
    realizouGestacoesStr: string;
    ultimaGestacaoTempoMeses: number;
    
    utilizaMedicamentos: boolean;
    utilizaMedicamentosStr: string;
    medicamentosUtilizados: string;

    alergias: boolean;
    alergiasStr: string;
    alergiasDesc: string;

    alteracoesCardiacas: boolean;
    alteracoesCardiacasStr: string;
    alteracoesCardiacasDesc: string;

    pressaoAlta: boolean;
    pressaoAltaStr: string;

    pressaoBaixa: boolean;
    pressaoBaixaStr: string;

    disturbioCirculatorio: boolean;
    disturbioCirculatorioStr: string;
    disturbioCirculatorioDesc: string;

    disturbioHormonal: boolean;
    disturbioHormonalStr: string;
    disturbioHormonalDesc: string;

    diabetes: boolean;
    diabetesStr: string;
    tipoDiabetes: number;
    tipoDiabetesStr: string;
    
    fezCirurgias: boolean;
    fezCirurgiasStr: string;
    cirurgiasDesc: string;
}

export interface Consulta {
    id: number;
    paciente: Paciente;
    unidadeSaude: UnidadeSaude;
    anamnese: Anamnese;
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
    completeStatus: string;
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