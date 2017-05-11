import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ListService {

  constructor(private storage: Storage) {
    this.storage.ready().then(() => {
        console.log("ready");
    })
  }

  public getLists() {
    return this.storage.get("_lists_");
  }

  public add(title: string) {
    this.storage.get("_lists_").then(
      val => {
        if (!val) {
          val = [];
        }
        if (val.find(listName => listName == title)) {

        } else {
            val.push(title)
            this.storage.set("_lists_", val);
        }
    });
  }
}
