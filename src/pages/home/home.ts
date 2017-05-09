import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemService } from '../../providers/item-service'
import { Item } from "../../models/item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ItemService]
})
export class HomePage {
  listName: string = 'my-shopping';
  public newItem: string;
  public items: Item[];

  constructor(public navCtrl: NavController, private itemService: ItemService) {
    this.loadItems();
  }

  loadItems() {
    this.items = [];
    this.itemService.getItems(this.listName).then(
      data => {
        if (data) {
          this.items = data.filter(item => item.status == 'new');
        } else {
          this.items = [];
        }
      });
  }

  itemTapped(event, item) {
    this.itemService.addOrToggleItem(this.listName, item, val => this.loadItems());
  }

  add() {
    let item = new Item();
    item.title = this.newItem;
    item.status = 'new';
    this.itemService.addOrToggleItem(this.listName, item, 
      (val=> {
        this.loadItems();
        this.newItem = '';
      }
      ));
  }
}
