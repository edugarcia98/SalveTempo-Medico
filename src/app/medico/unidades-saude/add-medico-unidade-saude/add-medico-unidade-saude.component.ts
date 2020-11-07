import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from '../unidade-saude.service';
import { UnidadeSaude } from '../unidade-saude';

import { DiaPeriodoTrabalho } from '../medico-unidade-saude';

import { Estado } from '../endereco/estado';
import { Cidade } from '../endereco/cidade';
import { KeyService } from 'src/app/geral/key/key.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-medico-unidade-saude',
  templateUrl: './add-medico-unidade-saude.component.html',
  styleUrls: ['./add-medico-unidade-saude.component.css']
})
export class AddMedicoUnidadeSaudeComponent implements OnInit {

  error: any;
  unidadesSaude: UnidadeSaude[];
  estados: Estado[];
  cidades: Cidade[];

  diasPeriodoTrabalho: Array<DiaPeriodoTrabalho> = [
    {id: 1, diaSemana: 'Segunda-feira', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 2, diaSemana: 'Terça-feira', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 3, diaSemana: 'Quarta-feira', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 4, diaSemana: 'Quinta-feira', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 5, diaSemana: 'Sexta-feira', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 6, diaSemana: 'Sábado', trabalha: false, manha: false, tarde: false, noite: false},
    {id: 7, diaSemana: 'Domingo', trabalha: false, manha: false, tarde: false, noite: false},
  ]

  selectedEstado = 0;
  selectedCidade = 0;
  selectedUnidadeSaude = 0;
  selectedDiaPeriodoTrabalho;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private keyService: KeyService,
              private router: Router,
              private ngxSpinnerService: NgxSpinnerService) {

  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.unidadeSaudeService.getEstados().subscribe(
        (items: Estado[]) => {
          this.estados = items;
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

  loadCidade() {
    this.ngxSpinnerService.show();
    this.unidadeSaudeService.getCidadeByEstadoId(this.selectedEstado.toString()).subscribe(
      (items: Cidade[]) => {
        this.ngxSpinnerService.hide();
        this.cidades = items;
      },
      (error: any) => {
        this.ngxSpinnerService.hide();
        this.error = error;
        console.log(this.error);
      }
    )
  }

  loadUnidadeSaude() {
    this.ngxSpinnerService.show();
    this.unidadeSaudeService.getUnidadesSaudeByCidadeId(this.selectedCidade.toString()).subscribe(
      (items: UnidadeSaude[]) => {
        this.ngxSpinnerService.hide();
        this.unidadesSaude = items;
      },
      (error: any) => {
        this.ngxSpinnerService.hide();
        this.error = error;
        console.log(this.error);
      }
    )
  }

  selecionaDiaSemana(dia: DiaPeriodoTrabalho, trabalha: boolean) {
    this.atualizaDiasSemana(dia.id, trabalha);

    if (trabalha) {
      document.getElementById("div-dia-" + dia.id.toString()).style.display = "block";
    } else {
      document.getElementById("div-dia-" + dia.id.toString()).style.display = "none";
    }
  }

  selecionaPeriodo(dia: DiaPeriodoTrabalho, nome: string, trabalha: boolean) {
    this.atualizaPeriodoDiaSemana(dia.id, nome, trabalha);
  }

  atualizaDiasSemana(id: number, trabalha: boolean) {
    this.diasPeriodoTrabalho.forEach(
      (dia: DiaPeriodoTrabalho) => {
        if (dia.id == id) {
          dia.trabalha = trabalha;
        }
      }
    );
  }

  atualizaPeriodoDiaSemana(id: number, nome: string, trabalha: boolean) {
    this.diasPeriodoTrabalho.forEach(
      (dia: DiaPeriodoTrabalho) => {
        if(dia.id == id) {
          if (nome == 'Manhã')
            dia.manha = trabalha;
          else if (nome == 'Tarde')
            dia.tarde = trabalha;
          else if (nome == 'Noite')
            dia.noite = trabalha;
        }
      }
    );
  }

  cadastrarMedicoUnidadeSaude() {
    var diaPeriodoTrabalho = '';

    this.diasPeriodoTrabalho.forEach(
      (dia: DiaPeriodoTrabalho) => {
        var item = '';
        var possuiPeriodosCadastrados = false;

        if (dia.trabalha) {
          item += dia.id.toString() + ':';

          if (dia.manha) { item += 'manha;'; possuiPeriodosCadastrados = true; }
          if (dia.tarde) { item += 'tarde;'; possuiPeriodosCadastrados = true; }
          if (dia.noite) { item += 'noite;'; possuiPeriodosCadastrados = true; }

          if (possuiPeriodosCadastrados) diaPeriodoTrabalho += item + '|';
        }
      }
    );
    
    this.unidadeSaudeService.postMedicoUnidadeSaude(sessionStorage.getItem('key'),
    parseInt(sessionStorage.getItem('id')), this.selectedUnidadeSaude,
    diaPeriodoTrabalho).subscribe(
      () => {
        this.router.navigate(['medico/unidades-saude/aguarde-confirmacao']);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }

  goToHomeUnidadesSaude() {
    this.router.navigate(['medico/unidades-saude']);
  }
}
