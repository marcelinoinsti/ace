import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-atributos',
  templateUrl: './atributos.component.html',
  styleUrls: ['./atributos.component.css']
})
export class AtributosComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  chave: string = ''
  descricao: string = ''
  explicacao: string = ''

  tipo_modal: any

  desabilitar_confirmar: boolean = true
  desabilitar_cancelar: boolean = true
  exibe_loading: boolean = true

  dados: any[] = [
    {
      "chave": "borne",
      "descricao": "Tipo de Borne",
      "explicativo": "Ut facere distinctio qui accusantium ratione aut molestiae adipisci ea neque iusto rem esse odio non obcaecati voluptas qui labore aperiam. Ea facere rerum ut officia inventore vel minus eligendi ea excepturi autem. Qui magnam ducimus et quia magnam et omnis quas a eius nobis qui aspernatur velit et natus doloremque. Et magni quos sit temporibus consequatur ea nesciunt fugiat sit velit blanditiis ut dolorum consequatur quo corrupti error ex quas aspernatur.",
      "tipo-dados": "1",
    },
    {
      "chave": "combi",
      "descricao": "Tipo de Combi",
      "explicativo": "Ut facere distinctio qui accusantium ratione aut molestiae adipisci ea neque iusto rem esse odio non obcaecati voluptas qui labore aperiam. Ea facere rerum ut officia inventore vel minus eligendi ea excepturi autem. Qui magnam ducimus et quia magnam et omnis quas a eius nobis qui aspernatur velit et natus doloremque. Et magni quos sit temporibus consequatur ea nesciunt fugiat sit velit blanditiis ut dolorum consequatur quo corrupti error ex quas aspernatur.",
      "tipo-dados": "2",
    },
    {
      "chave": "pt",
      "descricao": "Tipo de PT",
      "explicativo": "Ut facere distinctio qui accusantium ratione aut molestiae adipisci ea neque iusto rem esse odio non obcaecati voluptas qui labore aperiam. Ea facere rerum ut officia inventore vel minus eligendi ea excepturi autem. Qui magnam ducimus et quia magnam et omnis quas a eius nobis qui aspernatur velit et natus doloremque. Et magni quos sit temporibus consequatur ea nesciunt fugiat sit velit blanditiis ut dolorum consequatur quo corrupti error ex quas aspernatur.",
      "tipo-dados": "3",
    },
    {
      "chave": "inter",
      "descricao": "Tipo de Inter",
      "explicativo": "Ut facere distinctio qui accusantium ratione aut molestiae adipisci ea neque iusto rem esse odio non obcaecati voluptas qui labore aperiam. Ea facere rerum ut officia inventore vel minus eligendi ea excepturi autem. Qui magnam ducimus et quia magnam et omnis quas a eius nobis qui aspernatur velit et natus doloremque. Et magni quos sit temporibus consequatur ea nesciunt fugiat sit velit blanditiis ut dolorum consequatur quo corrupti error ex quas aspernatur.",
      "tipo-dados": "4",
    }
  ]

  colunas: PoTableColumn[] = []

  tipo_dados: PoSelectOption[] = [
    { label: 'String', value: '1' },
    { label: 'Integer', value: '2' },
    { label: 'Double', value: '3' },
    { label: 'Boolean', value: '4' }
  ]

  dados_selecionado: string = ''

  constructor(private apiService: ApiService, private poNotification: PoNotificationService, private poDialog: PoDialogService) { }

  ngOnInit(): void {
    this.colunas = this.apiService.getColumns(this)
    this.addActionsOnTable()
    this.consultaAtributos()
  }

  private modal_action_confirmar_editar: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      console.log('Confirmar')
    }
  }

  private modal_action_cancelar_editar: PoModalAction = {
    label: 'Cancelar',
    danger: true,
    action: () => {
      this.closeModal()
    }
  }

  private modal_action_confirmar_novo: PoModalAction = {
    label: 'Confirmar',
    danger: false,
    action: () => {
      console.log('Confirmar')
    }
  }

  private modal_action_cancelar_novo: PoModalAction = {
    label: 'Cancelar',
    danger: true,
    action: () => {
      this.closeModal()
    }
  }

  openModal() {
    this.poModal.open()
  }

  closeModal() {
    this.poModal.close()
  }

  onChange(event: any) {
    console.log(event)
    this.dados_selecionado = ''
  }

  addActionsOnTable(): void {
    if (this.dados != undefined) {
      this.dados = this.dados.map((item: any) => {
        item["actions"] = ["deletar", "editar"];
        return item;
      });
    }
  }

  acoesPrimarias() {
    let actions: any = {
      editar: this.modal_action_confirmar_editar,
      novo: this.modal_action_confirmar_novo
    }
    return actions[this.tipo_modal]
  }

  acoesSecundarias() {
    let actions: any = {
      editar: this.modal_action_cancelar_editar,
      novo: this.modal_action_cancelar_novo
    }
    return actions[this.tipo_modal]
  }


  novo() {
    this.tipo_modal = 'novo'
    this.openModal()
    this.chave = ''
    this.descricao = ''
    this.explicacao = ''
  }

  deletar(linha: any) {
    this.poDialog.confirm({ title: 'Atenção', message: `Deseja deletar o atributo <b>${linha.chave}</b>`, confirm: () => this.deletarAtributos(linha.chave) })
  }

  editar(linha: any) {
    this.tipo_modal = 'editar'
    this.chave = linha.chave
    this.descricao = linha.descricao
    this.explicacao = linha.explicativo
    this.dados_selecionado = linha['tipo-dados']
    this.openModal()
  }

  consultaAtributos() {
    let parametros = {
      'chaveini': 0,
      'chavefim': 999999
    }
    this.exibe_loading = false
    let source = new Observable(subscriber => {
      return this.apiService.doHttpGetQueryParams('atributo/consultabychave', parametros).subscribe({
        next: (data: any) => {
          if (data.items[0].ds_atributo['tt-ret'][0].chave.toUpperCase() == "OK") {
            this.exibe_loading = true
            console.log(data)
          } else {
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.exibe_loading = true
            this.poNotification.error({ message: mensagem, duration: 1000 })
          }
        },
        error: (e: any) => {
          console.log(e)
          this.exibe_loading = true
          this.poNotification.error({ message: e.message, duration: 1000 })
        },
        complete: () => {
          console.log('complete')
        }
      })
    })
    source.subscribe()
  }

  adicionarAtributos() {
    let parametros = {
      "tt-param": [
        {
          "tipo": this.dados_selecionado,
          "explicativo": this.explicacao,
          "chave": this.chave,
          "descricao": this.descricao
        }
      ]
    }

    this.exibe_loading = false
    let source = new Observable(subscriber => {
      return this.apiService.doHttpPost('atributo', parametros).subscribe({
        next: (data: any) => {
          if (data.items[0].ds_atributo['tt-ret'][0].chave.toUpperCase() == "OK") {
            this.exibe_loading = true
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.poNotification.error({ message: mensagem, duration: 2000 })
            console.log(data)
          } else {
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.exibe_loading = true
            this.poNotification.error({ message: mensagem, duration: 2000 })
          }
        },
        error: (e: any) => {
          console.log(e)
          this.exibe_loading = true
          this.poNotification.error({ message: e.message, duration: 1000 })
        },
        complete: () => {
          console.log('complete')
        }
      })
    })
    source.subscribe()
  }

  editarAtributos() {
    let parametros = {
      "tt-param": [
        {
          "tipo": this.dados_selecionado,
          "explicativo": this.explicacao,
          "chave": this.chave,
          "descricao": this.descricao
        }
      ]
    }

    this.exibe_loading = false
    let source = new Observable(subscriber => {
      return this.apiService.doHttpPut('atributo', parametros).subscribe({
        next: (data: any) => {
          if (data.items[0].ds_atributo['tt-ret'][0].chave.toUpperCase() == "OK") {
            this.exibe_loading = true
            console.log(data)
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.poNotification.error({ message: mensagem, duration: 2000 })
          } else {
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.exibe_loading = true
            this.poNotification.error({ message: mensagem, duration: 2000 })
          }
        },
        error: (e: any) => {
          console.log(e)
          this.exibe_loading = true
          this.poNotification.error({ message: e.message, duration: 1000 })
        },
        complete: () => {
          console.log('complete')
        }
      })
    })
    source.subscribe()
  }

  deletarAtributos(chave: any) {
    let parametros = {
      "tt-param": [
        {
          "chave": chave,
        }
      ]
    }

    this.exibe_loading = false
    let source = new Observable(subscriber => {
      return this.apiService.doHttpDelete('atributo', parametros).subscribe({
        next: (data: any) => {
          if (data.items[0].ds_atributo['tt-ret'][0].chave.toUpperCase() == "OK") {
            this.exibe_loading = true
            console.log(data)
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.poNotification.error({ message: mensagem, duration: 1000 })
          } else {
            let mensagem = data.items[0].ds_atributo['tt-ret'][0]['c-DESC']
            this.exibe_loading = true
            this.poNotification.error({ message: mensagem, duration: 2000 })
          }
        },
        error: (e: any) => {
          console.log(e)
          this.exibe_loading = true
          this.poNotification.error({ message: e.message, duration: 2000 })
        },
        complete: () => {
          console.log('complete')
        }
      })
    })
    source.subscribe()
  }

}
