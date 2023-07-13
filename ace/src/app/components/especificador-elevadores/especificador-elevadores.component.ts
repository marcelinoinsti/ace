import { Component, OnInit, ViewChild } from '@angular/core';
import { PoNotificationService, PoModalAction, PoModalComponent, PoTableColumn, PoAccordionItemComponent } from '@po-ui/ng-components';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-especificador-elevadores',
  templateUrl: './especificador-elevadores.component.html',
  styleUrls: ['./especificador-elevadores.component.css']
})
export class EspecificadorElevadoresComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild(PoAccordionItemComponent, { static: true }) questionOne!: PoAccordionItemComponent;

  colunas: Array<PoTableColumn> = []
  colunas_obras: Array<PoTableColumn> = []
  colunas_pavimento: any[] = []
  data: any[] = [
    {
      'codigo': 241356,
      'cnpj': '05571228000589',
      'nome': 'FERTILIZANTES TOC',
      'endereco': 'ROD. PLANTA GRANDE N89',
      'localidade': 'BARCARENA - PA',
      'filial': 'FILIAL NO'
    }
  ]
  data_obras: any[] = [
    {
      'id': 20043,
      'obra': '3 paradas',
      'pavimento': 3
    },
    {
      'id': 20089,
      'obra': '1 parada',
      'pavimento': 32
    },
    {
      'id': 20057,
      'obra': '2 paradas',
      'pavimento': 7
    },
  ]
  data_pavimento: any[] = [
    {
      'pavimento': 7,
      'pe-direito': 3.5,
      'marcacao-visual': 3,
      'terreo': 3
    }
  ]

  cliente_selecionado = undefined

  exibe_obra: boolean = false
  exibe_informacoes_obra: boolean = false

  tipo_modal: string = ''
  titulo_modal: string = ''

  constructor(private apiService: ApiService, private poNotification: PoNotificationService) { }


  ngOnInit(): void {
    this.colunas = this.apiService.getColumnsPesquisaCliente()
    this.colunas_obras = this.apiService.getColumnsObras()
    this.colunas_pavimento = this.apiService.getColumnsPavimento()
  }

  private acao_confirmar_modal_clientes: PoModalAction = {
    label: 'OK',
    danger: false,
    action: () => {
      if (this.cliente_selecionado == undefined) {
        return this.poNotification.information({ message: 'Um cliente deve ser selecionado.', duration: 3000 })
      } else {
        this.exibe_obra = true
        this.poModal.close()
      }
    }
  }

  private acao_salvar_modal_pavimentos: PoModalAction = {
    label: 'Salvar alterações',
    danger: false,
    action: () => {
      console.log('Confirmar')
      this.poModal.close()
    }
  }

  private acao_fechar_modal_pavimentos: PoModalAction = {
    label: 'Cancelar alterações',
    danger: true,
    action: () => {
      console.log('Fechar')
      this.poModal.close()
    }
  }

  acoesPrimarias() {
    let actions: any = {
      cliente: this.acao_confirmar_modal_clientes,
      pavimentos: this.acao_salvar_modal_pavimentos
    }
    return actions[this.tipo_modal]
  }

  acoesSecundarias() {
    let actions: any = {
      pavimentos: this.acao_fechar_modal_pavimentos
    }
    return actions[this.tipo_modal]
  }

  clienteSelecionado(event: any) {
    this.cliente_selecionado = event
  }

  novaObra() {
    this.exibe_informacoes_obra = true
  }

  abrirModal(tipo: string, titulo: string) {
    this.tipo_modal = tipo
    this.titulo_modal = titulo
    this.poModal.open()
  }

}
