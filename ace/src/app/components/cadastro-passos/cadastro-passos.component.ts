import { Component, OnInit } from '@angular/core';
import { PoRadioGroupOption, PoTableColumn, PoTreeViewItem } from '@po-ui/ng-components';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cadastro-passos',
  templateUrl: './cadastro-passos.component.html',
  styleUrls: ['./cadastro-passos.component.css']
})
export class CadastroPassosComponent implements OnInit {

  items: Array<PoTreeViewItem> = [
    {
      label: 'Condiments',
      value: 'condiments',
      subItems: [
        { label: 'Extra virgin Olive', value: 'extraVirginOlive' },
        { label: 'Mayonnaise', value: 'Mayonnaise' },
        { label: 'Tomato ketchup', value: 'tomatoKetchup' },
        { label: 'Soda', value: 'soda' }
      ]
    },
    {
      label: 'Drinks',
      value: 'drinks',
      subItems: [
        { label: 'Orange juice', value: 'orangeJuice' },
        { label: 'Grape juice', value: 'grapeJuice' },
        { label: 'Beer', value: 'beer' },
        { label: 'Wine', value: 'wine' },
        {
          label: 'Soda',
          value: 'soda',
          subItems: [
            { label: 'Orange juice', value: 'orangeJuice' },
            { label: 'Grape juice', value: 'grapeJuice' },
            { label: 'Beer', value: 'beer' },
            { label: 'Wine', value: 'wine' },
          ]

        }
      ]
    },
    {
      label: 'Grains',
      value: 122,
      subItems: [
        { label: 'Black bean', value: 'blackBean' },
        { label: 'Chickpeas', value: 'chickpeas' },
        { label: 'Lentil', value: 'lentil' },
        { label: 'Pea', value: 'pea' }
      ]
    },
    {
      label: 'Personal hygiene',
      value: 'personalHygiene',
      subItems: [
        { label: 'Body wash', value: 'bodyWash' },
        { label: 'Deodorant', value: 'deodorant' },
        { label: 'Shampoo', value: 'deodorant' },
        { label: 'Conditioner', value: 'conditioner' },
        { label: 'Sunscreen lotion', value: 'sunscreenLotion' }
      ]
    },
    {
      label: 'Frozen foods',
      value: 'frozenFoods',
      subItems: [
        { label: 'Hamburguer', value: 'hamburguer' },
        { label: 'Lasagna', value: 'lasagna' },
        { label: 'Sandwiches', value: 'sandwiches' }
      ]
    }
  ];
  items_radio: Array<PoRadioGroupOption> = [
    { label: 'Nova estrutura', value: '1' },
    { label: 'Processo', value: '2' },
    { label: 'Escolha única', value: '3' },
    { label: 'Segue o pai', value: '4' },
    { label: 'Opção padrão', value: '5' },
    { label: 'Acessório', value: '6' },
    { label: 'Mostrar no descritivo', value: '7' },
    { label: 'Mostrar na descrição', value: '8' },
    { label: 'Fantasma', value: '9' },
    { label: 'Ativo', value: '10' },
    { label: 'Visível para o usuário', value: '11' },
  ]
  sem_pai: Array<PoRadioGroupOption> = [
    { label: 'Sem pai', value: 1 }
  ]
  radio_primeira_linha: Array<PoRadioGroupOption> = [
    { label: 'Código', value: 1 },
    { label: 'Descrição', value: 2 }
  ]
  colunas: Array<PoTableColumn> = []
  items_tabela: any[] = [
    {
      "chave": "borne",
      "valor": "Teste 1",
      "formula": "1*9(8/9)"
    },
    {
      "chave": "crisis",
      "valor": "Teste 2",
      "formula": "9*1(4/9)"
    },
    {
      "chave": "travis",
      "valor": "Teste 3",
      "formula": "2*1(8*9)"
    }
  ]

  desabilitar_confirmar: boolean = true
  desabilitar_item: boolean = true
  desabilitar_descricao: boolean = true
  desabilitar_condicional: boolean = true
  desabilitar_quantidade: boolean = true
  desabilitar_radio: boolean = true
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.colunas = this.apiService.getColumnsPassos(this)
    this.addItemsOnTable()
  }

  editar() {
    this.desabilitar_item = false
    this.desabilitar_descricao = false
    this.desabilitar_condicional = false
    this.desabilitar_quantidade = false
    this.desabilitar_radio = false
    this.desabilitar_confirmar = false
  }

  confirmar() {
    this.desabilitar_item = true
    this.desabilitar_descricao = true
    this.desabilitar_condicional = true
    this.desabilitar_quantidade = true
    this.desabilitar_radio = true
    this.desabilitar_confirmar = true
  }

  editarTabela(value: any) { }

  deletar(value: any) { }

  addItemsOnTable() {
    if (this.items_tabela != undefined) {
      this.items_tabela = this.items_tabela.map((item: any) => {
        item["actions"] = ["deletar", "editar"];
        return item;
      });
    }
  }
}
