import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})

export class WeatherComponent implements OnInit {
  forecastList: any[] = [];
  cities = ['臺北市', '新北市', '桃園市', '臺中市', '高雄市'];
  selectedCity = new FormControl('臺北市');

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.selectedCity.valueChanges.subscribe(city => {
      if (city) {
        this.fetchWeather(city);
      }
    });

    const city = this.selectedCity.value;
    if (city) {
      this.fetchWeather(city); // 預設載入臺北市
    }
  }

  fetchWeather(cityName: string): void {
    this.weatherService.getWeatherByCity(cityName).subscribe({
      next: (data: any) => {
        const location = data.records?.location?.[0];
        if (location && location.weatherElement) {
          const wxElement = location.weatherElement.find((el: any) => el.elementName === 'Wx');
          this.forecastList = wxElement?.time || [];
        } else {
          this.forecastList = [];
        }
      },
      error: (err) => {
        console.error('API 錯誤:', err);
        this.forecastList = [];
      }
    });
  }
}

//export class WeatherComponent implements OnInit {
//  forecastList: any[] = [];

//  constructor(private weatherService: WeatherService) { }

///*這是 Angular 初始化元件的生命週期函式（OnInit），等於「畫面剛載入時」會自動觸發抓資料的動作。*/
//  ngOnInit(): void {
///* 呼叫 Angular 的 WeatherService 送出 HTTP 請求*/
//    this.weatherService.getTaipeiWeather().subscribe({
//      next: (data: any) => {
//        console.log('API 回傳:', data);

//        const location = data.records?.location?.[0];
//        console.log('location:', location);

//        if (location && location.weatherElement) {
//          const wxElement = location.weatherElement.find((el: any) => el.elementName === 'Wx');
//          console.log('Wx element:', wxElement);

//          if (wxElement && Array.isArray(wxElement.time)) {
///*資料成功取回後，將「天氣狀況（Wx）」的時間段資料指派給 forecastList，並觸發畫面更新。*/
//            this.forecastList = wxElement.time;
//            console.log('forecastList:', this.forecastList);
//          } else {
//            console.warn('找不到 Wx 資料');
//          }
//        } else {
//          console.warn('找不到 location 或 weatherElement');
//        }
//      },
//      error: (err) => {
//        console.error('API 錯誤:', err);
//      }
//    });
//  }
//}
