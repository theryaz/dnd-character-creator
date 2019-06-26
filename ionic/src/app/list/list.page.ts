import { Component } from '@angular/core';
import { CharacterData } from '../../providers/character-data';
import { ICharacter, ICharacterList } from '../../model/character';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public characters: ICharacter[] = [];

  constructor(public characterService: CharacterData, private storage: Storage) {
  }

  async fetchCharacters(event){
    const list: ICharacterList = await this.characterService.getRemoteData().toPromise() as ICharacterList;
    this.characters = list.data;
    
    await this.storage.set("characters", list);

    if(event) event.target.complete();
  }

  async ionViewDidEnter() {
    const localCharacters: ICharacterList = await this.storage.get("characters");
    if(localCharacters){
      this.characters = localCharacters.data;
    }else{
      this.fetchCharacters(null);
    }
  }
}
