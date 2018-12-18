import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class CrudService {

  constructor(
    private _http: Http
  ) { }

  create = (params) => new Promise((resolve, reject) => {
    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body),
      headersToAuth = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      optionsToAuth = new RequestOptions({
        'headers': headersToAuth
      });

    this._http
      .post(
        environment.crudServiceUrl + '/' + params.route + '?access_token=' + userData.id,
        params.objectToCreate,
        optionsToAuth
      ).subscribe(res => {
        console.log(res);
      });
  })

  readFromRoute = (params) => new Promise((resolve, reject) => {
    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body);

    let group, limit, match, containedIn, message, order, route, skip, where, query, queryWhere = '';
    params.group ? group = params.group : group = '';
    params.limit ? limit = '"limit":' + params.limit : limit = '"limit":1000';
    params.containedIn ? containedIn = params.containedIn : containedIn = '';
    params.match ? match = params.match : match = '';
    params.message ? message = params.message : message = 'Sucesso';
    params.order ? order = params.order : order = '';
    params.skip ? skip = ', "skip":' + params.skip : skip = '';
    params.where ? where = params.where : where = '';
    route = params.route;

    if (where) {
      for (let i = 0; i < where.length; i++) {
        if (i === 0) {
          queryWhere = ', "where":{"' + where[i].property + '":';

          if (typeof where[i].value === 'number') {
            queryWhere += where[i].value + ',';
          } else {
            queryWhere += '"' + where[i].value + '",';
          }

          continue;
        }
        queryWhere += '"' + where[i].property + '":';
        if (typeof where[i].value === 'number') {
          queryWhere += where[i].value + ',';
        } else {
          queryWhere += '"' + where[i].value + '",';
        }
      }

      where = queryWhere.substring(0, queryWhere.length - 1) + '}';
    }

    if (match) {
      for (let i = 0; i < match['properties']['length']; i++) {
        if (i === 0) {
          if (match['properties']['length'] > 1) {
            queryWhere = ', "where":{"or":{"' + match['properties'][i] + '":{"like":".*' + match['value'] + '.*"},';
          } else {
            queryWhere = ', "where":{"' + match['properties'][i] + '":{"like":".*' + match['value'] + '.*"},';
          }

          continue;
        }
        queryWhere += '"' + match['properties'][i] + '":{"like":"(?i)' + match['value'] + '.*"},';
      }
      if (match['properties']['length'] > 1) {
        match = queryWhere.substring(0, queryWhere.length - 1) + '}}';
      } else {
        match = queryWhere.substring(0, queryWhere.length - 1) + '}';
      }

      console.log(83);
    }

    query = limit + skip + where + match;
    query = '{' + query + '}';
    query = encodeURI(query);

    this._http
      .get(
        environment.crudServiceUrl + '/' + params.route + '?access_token=' + userData.id + '&filter=' + query
      ).subscribe(res => {
        const response = [];
        res = JSON.parse(res['_body']);

        for (let i = 0; i < res['length']; i++) {
          response.push({ attributes: res[i] });
        }

        resolve({
          message: 'teste',
          response: response
        });
      });
  })

  update = (params) => new Promise((resolve, reject) => {
    const route: string = params.route,
      paramToDelete: any = params.paramToDelete;

    if (!route) {
      reject({
        cod: 'd-01',
        message: 'Informar erro d-01 ao administrador'
      });
    }

    if (!paramToDelete) {
      reject({
        cod: 'd-02',
        message: 'Informar erro d-02 ao administrador'
      });
    }

    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body),
      headersToAuth = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      optionsToAuth = new RequestOptions({
        'headers': headersToAuth
      });

    for (let lim = paramToDelete.length, i = 0; i < lim; i++) {
      this._http.delete(
        environment.crudServiceUrl + '/' + params.route + paramToDelete[i] + '?access_token=' + userData.id,
        optionsToAuth)
        .subscribe(res => {
          if (i === (lim - 1)) {
            resolve({
              cod: 'u-03',
              message: 'Ítens apagados com sucesso'
            });
          }
        }, rej => {
          if (rej['_body']) {
            const json = JSON.parse(rej['_body']);
            let message = json.message;

            if (!message || message === '') {
              message = 'Erro ao apagar';
            }

            reject({
              cod: 'error-c-01',
              message: message,
              apiBody: json
            });
          } else {
            console.log(rej);
          }
        });
    }
  })

  delete = (params) => new Promise((resolve, reject) => {
    const route: string = params.route,
      paramToDelete: any = params.paramToDelete;

    if (!route) {
      reject({
        cod: 'd-01',
        message: 'Informar erro d-01 ao administrador'
      });
    }

    if (!paramToDelete) {
      reject({
        cod: 'd-02',
        message: 'Informar erro d-02 ao administrador'
      });
    }

    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body),
      headersToAuth = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      optionsToAuth = new RequestOptions({
        'headers': headersToAuth
      });

    for (let lim = paramToDelete.length, i = 0; i < lim; i++) {
      this._http.delete(
        environment.crudServiceUrl + '/' + params.route + paramToDelete[i] + '?access_token=' + userData.id,
        optionsToAuth)
        .subscribe(res => {
          if (i === (lim - 1)) {
            resolve({
              cod: 'u-03',
              message: 'Ítens apagados com sucesso'
            });
          }
        }, rej => {
          if (rej['_body']) {
            const json = JSON.parse(rej['_body']);
            let message = json.message;

            if (!message || message === '') {
              message = 'Erro ao apagar';
            }

            reject({
              cod: 'error-c-01',
              message: message,
              apiBody: json
            });
          } else {
            console.log(rej);
          }
        });
    }
  })

  createRole = (params) => new Promise((resolve, reject) => {
  })

  countFromRoute = (params) => new Promise((resolve, reject) => {
    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body);

    this._http
      .get(
        environment.crudServiceUrl + '/' + params.route + '/count?access_token=' + userData.id
      ).subscribe(res => {
        res = JSON.parse(res['_body']);

        resolve({
          message: 'teste',
          response: res['count']
        });
      });
  })
}
