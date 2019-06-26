import { Component, ViewChild } from '@angular/core';
import { CharacterData } from '../../providers/character-data';
import { ICharacter, ICharacterList } from '../../model/character';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {
  character: ICharacter = {
    str: 10,
    dex: 10,
    con: 10,
    wis: 10,
    int: 10,
    cha: 10
  } as ICharacter;


  constructor(public characterService: CharacterData, private navCtrl: NavController, private storage: Storage) {

  }

  async save() {
    const json = JSON.stringify(this.character);
    await fetch('https://dnd-character-creator-api.herokuapp.com/characters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: json,
    });

    const localChars: ICharacterList = await this.storage.get("characters");
    localChars.data.push(this.character);
    await this.storage.set("characters", localChars);

    this.navCtrl.pop();
  }
}
