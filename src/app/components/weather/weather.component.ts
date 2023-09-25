import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {WeatherService} from "./services/weather.service";
import {ErrorService} from "../../services/error.service";
import {WeatherTablePresets} from "../../interfaces/weather";
import {EMPTY, map, Subject, switchMap, take, takeUntil} from "rxjs";
import {WeatherSearchComponent} from "./components/weather-search/weather-search.component";
import {WeatherTableComponent} from "./components/weather-table/weather-table.component";
import {WeatherPresetSelectorComponent} from "./components/weather-preset-selector/weather-preset-selector.component";
import {ActivatedRoute, Router} from "@angular/router";

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
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  public presets: string[] = Object.values(WeatherTablePresets);
  private selectedPreset: WeatherTablePresets = WeatherTablePresets.HOURLY;
  private _onDestroy$ = new Subject();

  ngOnInit(): void {
    this.loadHourlyWeather('Moscow');
    this.loadDailyWeather('Moscow');

    this._route.queryParams.pipe(
      take(1),
      map((params) => {
        if (!params['preset']) {
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: {
              preset: this.selectedPreset
            }
          })
        }
        if (params['cities']) {
          console.log(params['cities']);
          // TODO load data for cities
        }
      })
    ).subscribe();
  }

  public async onAddCity(cityName: string) {
    this.loadHourlyWeather(cityName);

    await this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        cities: cityName
      }
    });
  }

  public async onPresetSelected(preset: WeatherTablePresets) {
    this.selectedPreset = preset;
    await this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        preset: preset
      }
    });
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
        console.log(res)
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
        console.log(res)
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }
}
