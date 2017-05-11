import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { ItemService } from "../providers/item-service";

platformBrowserDynamic().bootstrapModule(AppModule, {providers: [ItemService]});
