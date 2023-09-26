import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {WeatherService} from "./services/weather.service";
import {ErrorService} from "../../services/error.service";
import { WeatherTablePresets } from "src/app/constants/weather";
import {EMPTY, filter, map, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {WeatherSearchComponent} from "./components/weather-search/weather-search.component";
import {WeatherTableComponent} from "./components/weather-table/weather-table.component";
import {WeatherPresetSelectorComponent} from "./components/weather-preset-selector/weather-preset-selector.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { QueryParametersService } from "src/app/services/query-parameters.service";
import { WeatherTableData } from "src/app/interfaces/weather";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WeatherSearchComponent, WeatherTableComponent, WeatherPresetSelectorComponent],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(
    private weatherService: WeatherService,
    private errorService: ErrorService,
    private queryService: QueryParametersService,
  ) {}

  public presets: string[] = Object.values(WeatherTablePresets);
  public selectedPreset: WeatherTablePresets = WeatherTablePresets.HOURLY;
  public tableData: WeatherTableData[] = [];
  private _onDestroy$ = new Subject();

  ngOnInit(): void {
    this.checkQueryParams();
  }

  private checkQueryParams(): void {
    const preset = this.queryService.getQueryParamByName<WeatherTablePresets>('preset');
    if (preset) {
      this.selectedPreset = preset;
    } else {
      this.queryService.setQueryParam('preset', this.selectedPreset);
    }
  }

  public onAddCity(cityName: string): void {
    // this.loadHourlyWeather(cityName);
    // this.loadDailyWeather(cityName);
    // this.loadCity(cityName);
    this.weatherService.getCity(cityName).pipe(
      take(1),
      tap((city) => {
        if (!city) {
          this.errorService.showError(`Could not find city with name "${cityName}"`);
          return EMPTY;
        }
        this.queryService.addQueryParam('cities', cityName);
        return city;
      }),
      switchMap((cityName) => this.weatherService.getHourly(cityName.lat, cityName.lon)),
      map((data) => {
        console.log(data)
      })
      
    ).subscribe()
  }

  public onPresetSelected(preset: WeatherTablePresets): void {
    this.selectedPreset = preset;
    this.queryService.setQueryParam('preset', this.selectedPreset);
  }

  private loadCity(cityName: string): void {
    this.weatherService.getCity(cityName).pipe(
      takeUntil(this._onDestroy$),
      map((city) => {
        console.log(city);
      })
    ).subscribe();
  }

  private loadHourlyWeather(cityName: string): void {
    this.weatherService.getCity(cityName).pipe(
      takeUntil(this._onDestroy$),
      switchMap((city) => {
        if (!city) {
          this.errorService.showError(`Could not find city with name "${cityName}"`);
          return EMPTY;
        };
        return this.weatherService.getHourly(city.lat, city.lon)
      }),
      map((res) => {
        // console.log(res)
      })
    ).subscribe()
  }

  private loadDailyWeather(cityName: string): void {
    this.weatherService.getCity(cityName).pipe(
      takeUntil(this._onDestroy$),
      switchMap((city) => {
        if (!city) {
          this.errorService.showError(`Could not find city with name ${cityName}`);
          return EMPTY;
        };
        return this.weatherService.getDaily(city.lat, city.lon)
      }),
      map((res) => {
        // console.log(res)
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }
}
