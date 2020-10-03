import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta, Anamnese } from '../consulta';

@Component({
  selector: 'app-anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  public id;

  error: any;
  consulta: Consulta;
  anamnese: Anamnese;

  constructor(private keyService: KeyService,
              private consultaService: ConsultaService,
              private route: ActivatedRoute,
              private router: Router) {
    
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.id = this.keyService.getUrlId('cid', this.route);
      this.consultaService.getConsultaById(sessionStorage.getItem('key'),
       this.id).subscribe(
        (item: Consulta) => {
          this.consulta = item;
          this.anamnese = this.consulta.anamnese

          this.anamnese.fumaStr = this.booleanToSimNao(this.anamnese.fuma);
          this.anamnese.bebeStr = this.booleanToSimNao(this.anamnese.bebe);
          this.anamnese.qualidadeAlimentacaoIngestaoAguaStr = this.setQldAlimentacaoIngestaoAguaStr(this.anamnese.qualidadeAlimentacaoIngestaoAgua);
          this.anamnese.praticaAtividadeFisicaStr = this.booleanToSimNao(this.anamnese.praticaAtividadeFisica);
          this.anamnese.utilizaAnticoncepcionalStr = this.booleanToSimNao(this.anamnese.utilizaAnticoncepcional);
          this.anamnese.realizouGestacoesStr = this.booleanToSimNao(this.anamnese.realizouGestacoes);
          this.anamnese.utilizaMedicamentosStr = this.booleanToSimNao(this.anamnese.utilizaMedicamentos);
          this.anamnese.alergiasStr = this.booleanToSimNao(this.anamnese.alergias);
          this.anamnese.alteracoesCardiacasStr = this.booleanToSimNao(this.anamnese.alteracoesCardiacas);
          this.anamnese.alteracoesCardiacasStr = this.booleanToSimNao(this.anamnese.alteracoesCardiacas);
          this.anamnese.pressaoAltaStr = this.booleanToSimNao(this.anamnese.pressaoAlta);
          this.anamnese.pressaoBaixaStr = this.booleanToSimNao(this.anamnese.pressaoBaixa);
          this.anamnese.disturbioCirculatorioStr = this.booleanToSimNao(this.anamnese.disturbioCirculatorio);
          this.anamnese.disturbioHormonalStr = this.booleanToSimNao(this.anamnese.disturbioHormonal);
          this.anamnese.diabetesStr = this.booleanToSimNao(this.anamnese.diabetes);
          this.anamnese.tipoDiabetesStr = this.setTipoDiabetes(this.anamnese.tipoDiabetes);
          this.anamnese.fezCirurgiasStr = this.booleanToSimNao(this.anamnese.fezCirurgias);
          console.log(this.anamnese)
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )

    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  booleanToSimNao(field: boolean) {
    if (field){
      return "Sim";
    } else {
      return "Não";
    }
  }

  setQldAlimentacaoIngestaoAguaStr(item: number) {
    switch(item) {
      case 1: { return "Boa"; }
      case 2: { return "Regular"; }
      case 3: { return "Ruim"; }
    }
  }

  setTipoDiabetes(item: number) {
    switch(item) {
      case 1: { return "Tipo 1"; }
      case 2: { return "Tipo 2"; }
      case 3: { return "Gestacional"; }
    }
  }

  goToConsulta(id: number) {
    this.router.navigate([`medico/consulta/${id}/detail`]);
  }

  goToConsultas(status: string) {
    if (status == 'P' || status == 'A') {
      this.router.navigate([`medico/agenda-consultas`]);
    } else if (status == 'F') {
      this.router.navigate([`medico/historico-consultas`]);
    }
  }

}
