import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherTableComponent } from './components/weather/components/weather-table/weather-table.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {WeatherSearchComponent} from "./components/weather/components/weather-search/weather-search.component";
import {WeatherPresetSelectorComponent} from "./components/weather/components/weather-preset-selector/weather-preset-selector.component";
import {TemperatureConverterPipe} from "./pipes/temperature-converter.pipe";
import {WeatherComponent} from "./components/weather/weather.component";
import { QueryParametersService } from './services/query-parameters.service';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureConverterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    FormsModule,
    WeatherComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
