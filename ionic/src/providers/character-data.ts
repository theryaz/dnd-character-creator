import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CharacterData {

    constructor(private http: HttpClient) {

    }

    getRemoteData(){
        return this.http.get('https://dnd-character-creator-api.herokuapp.com/characters');
    }

}
