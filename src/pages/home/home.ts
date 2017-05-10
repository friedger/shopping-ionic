import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, navParams: NavParams, private itemService: ItemService) {
    this.listName = navParams.get('list');

    if (!this.listName) {
      this.listName = 'my-shopping'
    }
    console.log(this.listName);
    this.loadItems();
  }

  loadItems() {
    this.items = [];
    this.itemService.getItems(this.listName).then(
      data => {
        if (data) {
          this.items = data.filter(item => item.status == 'new');
          this.items.sort((a: Item, b: Item) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
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
      (val => {
        this.loadItems();
        this.newItem = '';
      }
      ));
  }
}
