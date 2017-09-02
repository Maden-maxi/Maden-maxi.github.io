import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';
const current_language = 'ru';
import {RU_TRANS} from './i18n/messages.ru';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule/*, {
  providers: [
    {provide: TRANSLATIONS, useValue: RU_TRANS},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    {provide: LOCALE_ID, useValue: 'ru'}
  ]
}*/);
