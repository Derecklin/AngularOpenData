import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from './weather.service';
import {
  WeatherCityCode,
  WeatherCityOption,
  WeatherCityOptions,
  WeatherCityMap
} from '../constants/cityconstants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: [ './weather.component.css']
})

export class WeatherComponent implements OnInit {

  forecastList: any[] = [];
  // Reactive Form 控制項：綁定下拉選單，預設值為「臺北市」
  selectedCity = new FormControl<WeatherCityCode>('Taipei');
  // 城市下拉清單資料
  CitiesForHtml = WeatherCityOptions;//for weather.component.html
  // 建構式：注入 WeatherService 供後續呼叫 API 使用
  constructor(private weatherService: WeatherService) { }

  //OnInit 初始化邏輯
  ngOnInit(): void {
    // 當使用者改變城市選擇時，valueChanges 會發出事件，立即呼叫 fetchWeather()
    this.selectedCity.valueChanges.subscribe(cityCode => {
      if (cityCode) {
        this.fetchWeather(cityCode);// 傳入使用者選擇的城市查詢天氣
      }
    });
    // 第一次進入頁面時預設載入臺北市天氣
    const cityCode = this.selectedCity.value;
    if (cityCode) {
      this.fetchWeather(cityCode); // 預設載入臺北市
    }
  }

  fetchWeather(cityCode: WeatherCityCode): void {
    const cityName = WeatherCityMap[cityCode]; // 取得中文名稱
    const callback = (data: any) => {
      const location = data.records?.location?.[0];
      if (location && location.weatherElement) {
        const wxElement = location.weatherElement.find((el: any) => el.elementName === 'Wx');
        this.forecastList = wxElement?.time || [];
      } else {
        this.forecastList = [];
      }
    };

    if (cityCode === 'Taipei') {
      this.weatherService.getTaipeiWeather().subscribe({
        next: callback,
        error: (err) => {
          console.error('API 錯誤:', err);
          this.forecastList = [];
        }
      });
    } else {
      this.weatherService.getWeatherByCity(cityName).subscribe({
        next: callback,
        error: (err) => {
          console.error('API 錯誤:', err);
          this.forecastList = [];
        }
      });
    }
  }
  //weather.component.css/weather.component.html
  getCardBackgroundClass(condition: string): string {
    //switch (condition) {
    //  case '雨':
    //    return 'rainy';
    //  case '晴天':
    //    return 'sunny';
    //  case '多雲':
    //    return 'cloudy';
    //  default:
    //    return 'default-bg';
    //}
    if (condition.includes('雨')) return 'weather-rainy-bg';
    if (condition.includes('雲')) return 'weather-cloudy-bg';
    if (condition.includes('晴')) return 'weather-sunny-bg';
    return 'default-bg';
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
