import { BrowserModule } from '@angular/platform-browser';
import {
    NgModule,
    ApplicationRef,
    APP_INITIALIZER,
    LOCALE_ID,
    CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    I18NextModule,
    I18NEXT_SERVICE,
    ITranslationService
} from 'angular-i18next';
import { ToasterModule } from 'angular2-toaster';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

const i18nextOptions = {
    whitelist: ['en', 'de'],
    fallbackLng: localStorage.getItem('stanapplang') || 'de',
    ns: ['default'],
    defaultNS: 'default',
    debug: true,
    returnEmptyString: false,
    backend: {
        loadPath: function(langs, ns) {
            return 'https://loopback3-i18next.herokuapp.com/api/Published/53ae78aa-42b2-4804-9bfb-1a2ce322f89e/{{lng}}/{{ns}}';
        }
    },
    detection: {
        order: ['cookie'],
        lookupCookie: 'lang',
        caches: ['cookie'],
        cookieMinutes: 10080, // 7 days
        cookieDomain: 'location.href.host'
    }
};

export function appInit(i18next: ITranslationService) {
    return () => {
        console.log('language initalize');
        return i18next // was    let promise: Promise<I18NextLoadResult> = i18next
            .use(XHR)
            .use(LanguageDetector)
            .init(i18nextOptions);
    };
}

export function localeIdFactory(i18next: ITranslationService) {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToasterModule.forRoot(),
        I18NextModule.forRoot(),
        SharedModule.forRoot(),
        PagesModule
    ],
    providers: [I18N_PROVIDERS],
    // providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
