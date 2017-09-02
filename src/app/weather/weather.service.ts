import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export const SEARCH_PARAMS = [
  {param: 'q', name: 'City Name', info: 'By city name {city name},{country code}'},
  {param: 'id', name: 'City ID', info: 'By city ID'},
  {param: 'coordinates', name: 'Coordinates', info: 'By geographic coordinates'},
  {param: 'zip', name: 'Zip Code', info: 'By ZIP code {zip code},{country code}'}
];

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
   * Get forecast data
   * @returns {Observable<any>}
   */
  weather(paramsQuery: WeatherParams, route: 'weather' | 'forecast' = 'weather'): Observable<any> {
    const def = this.defaults;
    const fromString = this.serialize( Object.assign( paramsQuery, def) );
    const params = new HttpParams({fromString});
    console.log(window.document.documentElement.lang);
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
