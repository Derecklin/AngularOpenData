//declarations：聲明所有元件
//providers：註冊 Service 讓 Angular 可以進行依賴注入（DI）
//imports：載入所需模組，如 HttpClientModule 允許我們呼叫 Web API
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//----------add test start----------
import { WeatherService } from './weather/weather.service';
import { WeatherComponent } from './weather/weather.component';
//----------add test end----------
//----------material--------------
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [WeatherService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
