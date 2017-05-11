import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  template: `
  <form (ngSubmit)="dismiss()">
  <label>Enter title of new list
  <ion-input type="text" [(ngModel)] = "title"
  [ngModelOptions]="{standalone:true}"
  placeholder="Title" aria-label="title" item-left focuser></ion-input>
  <button ion-button type="submit">Ok</button>
  </label>
  </form>
  `
})
export class TitleDialog {
    public title: string;
 constructor(params: NavParams, private viewCtrl: ViewController) {
   
 }

  dismiss() {
   let data = { 'title': this.title };
   this.viewCtrl.dismiss(data);
 }

}