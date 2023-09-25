import {Component, OnInit} from '@angular/core';
import {WeatherService} from './components/weather/services/weather.service';
import {EMPTY, map, switchMap, take} from 'rxjs';
import {ErrorService} from './services/error.service';
import {WeatherTablePresets} from "./interfaces/weather";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';
  //
  // constructor(private weatherService: WeatherService, private errorService: ErrorService) {}
  //
  // public presets: string[] = Object.values(WeatherTablePresets);
  // private selectedPreset: WeatherTablePresets = WeatherTablePresets.HOURLY;
  //
  // ngOnInit(): void {
  //   this.loadHourlyWeather('Moscow');
  //   this.loadDailyWeather('Moscow');
  // }
  //
  // public onAddCity(cityName: string): void {
  //   this.loadHourlyWeather(cityName);
  // }
  //
  // public onPresetSelected(preset: WeatherTablePresets): void {
  //   console.log(preset);
  //   this.selectedPreset = preset;
  // }
  //
  // private loadHourlyWeather(cityName: string): void {
  //   this.weatherService.getCity(cityName).pipe(
  //     take(1),
  //     switchMap((city) => {
  //       if (!city) {
  //         this.errorService.showError(`Could not find city with name "${cityName}"`);
  //         return EMPTY;
  //       };
  //       return this.weatherService.getHourly(city.lat, city.lon)
  //     }),
  //     map((res) => {
  //       console.log(res)
  //     })
  //   ).subscribe()
  // }
  //
  // private loadDailyWeather(cityName: string): void {
  //   this.weatherService.getCity(cityName).pipe(
  //     take(1),
  //     switchMap((city) => {
  //       if (!city) {
  //         this.errorService.showError(`Could not find city with name ${cityName}`);
  //         return EMPTY;
  //       };
  //       return this.weatherService.getDaily(city.lat, city.lon)
  //     }),
  //     map((res) => {
  //       console.log(res)
  //     })
  //   ).subscribe()
  // }


}
