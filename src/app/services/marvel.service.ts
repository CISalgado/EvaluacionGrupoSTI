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

  getCharacters() {
    const auth = this.getAuthParams();
    return this.http.get(`https://gateway.marvel.com/v1/public/characters?limit=50&${auth}`);
  }

  getCharacterById(id: string) {
    const auth = this.getAuthParams();
    return this.http.get(`https://gateway.marvel.com/v1/public/characters/${id}?${auth}`);
  }
}
