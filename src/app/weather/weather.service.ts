import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {
  private rootUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }
  testKey(key): Observable<any> {
    const params = new HttpParams()
    .set('APPID', key)
    .set('q', 'London');
    return this.http.get(this.rootUrl, {params});
  }
  get apiKey(): string|null {
    return localStorage.getItem('apiKey');
  }
  set apiKey(val) {
    localStorage.setItem('apiKey', val);
  }
  removeKey(): void {
    this.apiKey = null;
    localStorage.removeItem('apiKey');
  }

}
