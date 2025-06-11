import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  constructor(private http: HttpClient) {}

  private getAuthParams() {
    const ts = environment.ts;
    const publicKey = environment.publicKey;
    const privateKey = environment.privateKey;
    const hash = md5(ts + privateKey + publicKey);

    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }

  getCharacters(offset: number = 0, limit: number = 54, nameStartsWith: string = '') {
    const auth = this.getAuthParams();
    let url = `${environment.baseApiUrl}?${auth}&limit=${limit}&offset=${offset}`;

    if (nameStartsWith) {
      url += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`;
    }

    return this.http.get(url);
  }


  getCharacterById(id: string) {
    const auth = this.getAuthParams();
    return this.http.get(`${environment.baseApiUrl}/${id}?${auth}`);
  }
}
