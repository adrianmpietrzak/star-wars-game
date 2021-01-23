import axios, { AxiosInstance } from 'axios';
import { PeopleModel, ApiResult } from './../types/api/index';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

const url = 'https://swapi.dev/api/';

export class ClientApi {
  protected readonly request: AxiosInstance;

  public constructor() {
    this.request = axios.create({
      baseURL: url,
    });

  }

  public getUser = () => this.request.get<PeopleModel>('/people');
  public getPeople = (url?: string): Promise<ApiResult<PeopleModel>> => {
    return new Promise((resolve, reject) => {
      this.request.get(url ? url : '/people').then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err.response);
      })
    });
  }
}