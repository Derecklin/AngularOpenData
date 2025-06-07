import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WeatherService {
/*這裡用相對路徑 /api/weather，但實際會被 proxy.conf.js 代理到 ASP.NET Core 的 /api/weather。*/
  private readonly apiUrl = '/api/weather'; // 經由 proxy 重導到 ASP.NET Core 後端
  constructor(private http: HttpClient) { }

  /*HttpClient 送出 GET 請求，回傳 Observable < any > 給 Component 訂閱（subscribe）*/
  getWeatherByCity(city: string) {
    const params = new HttpParams().set('locationName', city);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getTaipeiWeather() {
    return this.http.get<any>(`${this.apiUrl}/taipei`);
  }
}
