import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../models/item'

@Injectable()
export class ItemService {
  public items: Item[];

  constructor(private storage: Storage) {
    this.storage.ready().then(() => {
        console.log("ready");
    })
  }

  public getItems(name: string) {
    return this.storage.get(name);
  }

  public addOrUpdateItem(name:string, item: Item, callback) {
    this.storage.get(name).then(list => {
        if (list == null) {
            list = [];
        }
        let storedItem = list.find(i => i.title == item.title);
        if (storedItem) {
            this.updateItemValues(storedItem, item);
        } else {
            list.push(item);
        }
        this.storage.set(name, list).then(callback)
    });
    }


    public addOrToggleItem(name:string, item: Item, callback) {
     this.storage.get(name).then(list => {
        if (list == null) {
            list = [];
        }
        let storedItem = list.find(i => i.title == item.title);
        if (storedItem) {
            Item.toggleStatus(storedItem);
        } else {
            list.push(item);
        }
        this.storage.set(name, list).then(callback)
    });
    }
    private updateItemValues(storedItem: Item, changedItem: Item) {
      storedItem.status = changedItem.status;
    }
}