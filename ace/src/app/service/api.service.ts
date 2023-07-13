import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getColumns(component_instance: any): PoTableColumn[] {
    return [
      {
        property: "actions",
        label: "Ações",
        type: "icon",
        icons: [
          {
            action: (value: any, row: any) => {
              component_instance.deletar(
                value,
                row,
              )
            },
            color: "primary",
            icon: "po-icon po-icon-delete",
            tooltip: "Clique aqui para deletar",
            value: "deletar"
          },
          {
            action: (value: any, row: any) => {
              component_instance.editar(
                value,
                row,
              )
            },
            color: "primary",
            icon: "po-icon po-icon-edit",
            tooltip: "Clique aqui para editar",
            value: "editar"
          }
        ]
      },

      { property: 'chave', label: 'Chave' },
      { property: 'descricao', label: 'Descrição' },
      { property: 'explicativo', label: 'Explicativo', width: '60%' },
      { property: 'tipo-dados', label: 'Tipo de dados' }
    ]
  }

  getColumnsPassos(component_instance: any): PoTableColumn[] {
    return [
      {
        property: "actions",
        label: "Ações",
        type: "icon",
        icons: [
          {
            action: (value: any, row: any) => {
              component_instance.deletar(
                value,
                row,
              )
            },
            color: "primary",
            icon: "po-icon po-icon-delete",
            tooltip: "Clique aqui para deletar",
            value: "deletar"
          },
          {
            action: (value: any, row: any) => {
              component_instance.editarTabela(
                value,
                row,
              )
            },
            color: "primary",
            icon: "po-icon po-icon-edit",
            tooltip: "Clique aqui para editar",
            value: "editar"
          }
        ]
      },

      { property: 'chave', label: 'Chave' },
      { property: 'valor', label: 'Valor' },
      { property: 'formula', label: 'Fórmula' }
    ]
  }

  getColumnsPesquisaCliente(): PoTableColumn[] {
    return [
      { property: 'codigo', label: 'Código' },
      { property: 'cnpj', label: 'CNPJ' },
      { property: 'nome', label: 'Nome' },
      { property: 'endereco', label: 'Endereço' },
      { property: 'localidade', label: 'Localidade' },
      { property: 'filial', label: 'Filial' },
    ]
  }

  getColumnsObras(): PoTableColumn[] {
    return [
      { property: 'id', label: 'ID' },
      { property: 'obra', label: 'Obras' },
      { property: 'pavimento', label: 'Pavimentos' }
    ]
  }

  getColumnsPavimento() {
    return [
      { property: 'pavimento', label: 'Pavimento', readonly: true, freeze: true, width: 120 },
      { property: 'pe-direito', label: 'Pé direito', width: 120 },
      { property: 'marcacao-visual', label: 'Marcação visual', readonly: true, freeze: true, width: 120 },
      { property: 'terreo', label: 'Térreo', readonly: true, freeze: true, width: 120 }
    ]
  }

  doHttpPost(api: string, parametros: any) {
    let url = environment.url + api
    let encoded = btoa('klift1:Schmersal@2023')

    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + encoded)
    headers = headers.append("Content-Type", "application/json")

    return this.http.post(url, parametros, {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    })
  }

  doHttpGet(api: string) {
    let url = environment.url + api
    let encoded = btoa('klift1:Schmersal@2023')

    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + encoded)
    headers = headers.append("Content-Type", "application/json")

    return this.http.get(url, {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    })
  }

  doHttpGetQueryParams(api: string, parametros: any) {
    let url = environment.url + api
    let encoded = btoa('klift1:Schmersal@2023')
    console.log(parametros)
    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + encoded)
    headers = headers.append("Content-Type", "application/json")

    let params = new HttpParams()
    params = params.append('chaveini', parametros['chaveini'])
    params = params.append('chavefim', parametros['chavefim'])

    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'json',
      withCredentials: true
    })
  }

  doHttpPut(api: string, parametros: any) {
    let url = environment.url + api
    let encoded = btoa('klift1:Schmersal@2023')

    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + encoded)
    headers = headers.append("Content-Type", "application/json")

    return this.http.put(url, parametros, {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    })
  }

  doHttpDelete(api: string, parametros: any) {
    let url = environment.url + api
    let encoded = btoa('klift1:Schmersal@2023')

    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + encoded)
    headers = headers.append("Content-Type", "application/json")

    return this.http.delete(url, {
      headers: headers,
      params: parametros,
      responseType: 'json',
      withCredentials: true
    })
  }
}
