export class Item {
  public title:  string;
  public status: string;
  public price: string;

  public static toggleStatus(item: Item) {
      if (item.status == 'new') {
          item.status = 'bought'
      } else {
          item.status = "new";
      }
  }
}