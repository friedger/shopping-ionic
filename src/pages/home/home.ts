import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { ItemService } from '../../providers/item-service'
import { Item } from "../../models/item";
import { TitleDialog } from "./title";
import { ListService } from "../../providers/list-service";

@IonicPage({
  name:'list',
  segment: 'list/:list'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ItemService, ListService]
})
export class HomePage {
  listName: string = 'my-shopping';
  public newItem: string;
  public items: Item[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    navParams: NavParams,
    private listService: ListService,
    private itemService: ItemService) {
    this.listName = navParams.get('list');

    if (navParams.get('newList')) {
      this.showTitleDialog();
    } else {
      if (!this.listName) {
        this.listName = 'my-shopping'; // should be last opened
      }
      this.loadItems();
    }
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

  showTitleDialog() {
    let titleDialog = this.modalCtrl.create(TitleDialog);
    titleDialog.onDidDismiss(data => {
      if (data) {
        this.listName = data.title;
        this.listService.add(this.listName);
      }
      this.loadItems();
    });
    titleDialog.present();
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
