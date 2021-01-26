import axios, { AxiosInstance } from 'axios';
import { PeopleModel, ApiResult, StarshipsModel } from './../types/api/index';

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

  public getPeople = (url?: string): Promise<ApiResult<PeopleModel>> => {
    return new Promise((resolve, reject) => {
      this.request.get(url ? url : '/people').then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err.response);
      })
    });
  }

  public getStarships = (url?: string): Promise<ApiResult<StarshipsModel>> => {
    return new Promise((resolve, reject) => {
      this.request.get(url ? url : '/starships').then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err.response);
      })
    });
  }
}