import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpParams, HttpProgressEvent, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare var CITY_LIST;

export const SEARCH_PARAMS = [
  {param: 'q', name: 'City Name', info: 'By city name {city name},{country code}'},
  {param: 'id', name: 'City ID', info: 'By city ID'},
  {param: 'coordinates', name: 'Coordinates', info: 'By geographic coordinates'},
  {param: 'zip', name: 'Zip Code', info: 'By ZIP code {zip code},{country code}'}
];

export interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number,
    lat: number
  };
}

export interface WeatherParams {
  q: string; // By city name {city name},{country code}
  id: number; // By city ID
  lat: number; // By geographic coordinates latitude
  lon: number; // By geographic coordinates longitude
  zip: string; // By ZIP code {zip code},{country code}
}

interface WeatherLang {
  code: string;
  name: string;
}

@Injectable()
export class WeatherService {
  public static weatherLangs: WeatherLang[] = [
    {code: 'en', name: 'English'},
    {code: 'de', name: 'Deutsche'},
    {code: 'ru', name: 'Русский'}
    /*{code: 'fr', name: 'French'},
    {code: 'it', name: 'Italian'},
    {code: 'ua', name: 'Ukrainian'}*/
  ];
  citiesList;
  private prefix = 'openweathermap_';
  /**
   * Api Root
   * @type {string}
   */
  private rootUrl = 'https://api.openweathermap.org/data/2.5/';
  /**
   * Api services
   * @type {{forecast: string; weather: string}}
   */
  private paths = {
    forecast: 'forecast',
    weather: 'weather'
  };
  /**
   * Default params in querySting
   * @type {{APPID: string; lang: string; units: string}}
   */
  get defaults() {
    return{
      APPID: this.apiKey,
      lang: this.lang,
      units: 'metric'
    };
  }
  get apiKey(): string|null {
    return localStorage.getItem( this.prefix + 'apiKey');
  }
  set apiKey(val: string) {
    localStorage.setItem(this.prefix + 'apiKey', val);
  }
  get lang(): string|null {
    return localStorage.getItem(this.prefix + 'lang');
  }
  set lang(lang: string) {
    localStorage.setItem(this.prefix + 'lang', window.document.documentElement.lang);
  }
  get weatherData() {
    return JSON.parse(localStorage.getItem(this.prefix + 'weather_data'));
  }
  set weatherData(data) {
    localStorage.setItem(this.prefix + 'weather_data', JSON.stringify(data));
  }
  get forecastData() {
    return JSON.parse(localStorage.getItem(this.prefix + 'forecast_data'));
  }
  set forecastData(data) {
    localStorage.setItem(this.prefix + 'forecast_data', JSON.stringify(data));
  }
  /**
   * Constructor
   * @param {HttpClient, URL} http
   */
  constructor(private http: HttpClient) { }
  /**
   * Flush service data
   */
  flushData() {
    localStorage.removeItem(this.prefix + 'forecast_data');
    localStorage.removeItem(this.prefix + 'weather_data');
    localStorage.removeItem(this.prefix + 'apiKey');
    localStorage.removeItem(this.prefix + 'lang');
  }
  /**
   * Clear search reuslts
   */
  clearSearchResult() {
    localStorage.removeItem(this.prefix + 'forecast_data');
    localStorage.removeItem(this.prefix + 'weather_data');
  }
  /**
   * Build icon image url
   * @param {string} icon
   * @returns {string}
   */
  icon(icon: string): string {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }
  /**
   * Test api key
   * @param key
   * @returns {Observable<any>}
   */
  testKey(key): Observable<any> {
    const fromString = this.serialize({APPID: key, q: 'London'});
    const params = new HttpParams({fromString});
    return this.http.get(this.rootUrl + this.paths.weather, {params});
  }

  /**
   * Get cities data
   * @returns {Observable<any>}
   */
  initDataCities(): Observable<HttpEvent<any>> { 
    /*const req = new HttpRequest('GET', 'assets/data/city.list.min.json', {});*/
    /*const request: Observable<HttpEvent<any>> = this.http.get('assets/data/city.list.min.json', {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });*/
    return this.http.get('assets/data/city.list.min.json', {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });

    /*request.subscribe((event) => {
      console.log(event);
      if (event.type === HttpEventType.DownloadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${percentDone} downloaded.`);
      } else if (event instanceof HttpResponse) {
        console.log('File is uploaded', event);
        const script = window.document.createElement('script');
        script.src = 'assets/data/city.list.min.js';
        window.document.head.appendChild(script);
        script.addEventListener('load', function (ev) {
          console.log(ev, CITY_LIST);
        });
      }
    }, error => {
      console.log(error);
    });*/

  }
  /**
   * Get forecast data
   * @returns {Observable<any>}
   */
  weather(paramsQuery: WeatherParams, route: 'weather' | 'forecast' = 'weather'): Observable<any> {
    const def = this.defaults;
    const fromString = this.serialize( Object.assign( paramsQuery, def) );
    const params = new HttpParams({fromString});
    return this.http.get(this.rootUrl + route, {params});
  }
  /**
   * Build query string
   * @param obj
   * @returns {string}
   */
  private serialize(obj: any): string {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
}


function getCityList(argument) {
    const req = new XMLHttpRequest();
    // report progress events
    req.addEventListener('progress', function(event) {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        // ...
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    }, false);
    // load responseText into a new script element
    req.addEventListener('load', function(event: any) {
      let e = event.target;
      let s = document.createElement('script');
      s.innerHTML = e.responseText;
      // or: s[s.innerText!=undefined?"innerText":"textContent"] = e.responseText
      document.documentElement.appendChild(s);

      s.addEventListener('load', function() {
        // this runs after the new script has been executed...
      });
    }, false);
    req.open('GET', 'foo.js');
    req.send();
}