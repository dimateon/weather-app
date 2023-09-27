import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { ErrorService } from '../../services/error.service';
import { WeatherInitialCities, WeatherTablePresets } from 'src/app/constants/weather';
import { EMPTY, forkJoin, from, of, switchMap } from 'rxjs';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { WeatherPresetSelectorComponent } from './components/weather-preset-selector/weather-preset-selector.component';
import { QueryParametersService } from 'src/app/services/query-parameters.service';
import { WeatherTableData } from 'src/app/interfaces/weather';
import { getDailyHeaders, getHourlyHeaders } from '../../utils/utils';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [WeatherSearchComponent, WeatherTableComponent, WeatherPresetSelectorComponent],
    providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
    constructor(
        private weatherService: WeatherService,
        private errorService: ErrorService,
        private queryService: QueryParametersService,
        private cdr: ChangeDetectorRef
    ) {}

    public presets: string[] = Object.values(WeatherTablePresets);
    public selectedPreset: WeatherTablePresets = WeatherTablePresets.HOURLY;
    public tableData: WeatherTableData[] = [];
    public tableHeaders: string[];

    private hourlyData: WeatherTableData[] = [];
    private hourlyHeaders: string[] = [];
    private dailyData: WeatherTableData[] = [];
    private dailyHeaders: string[] = [];
    private citiesToLoad: string[] = WeatherInitialCities;

    ngOnInit(): void {
        this.dailyHeaders = getDailyHeaders();
        this.hourlyHeaders = getHourlyHeaders();
        this.checkQueryParams();
        this.loadCitiesGroup(this.citiesToLoad, false);
    }

    public onAddCity(cityName: string): void {
        this.loadCity(cityName);
    }

    public onPresetSelected(preset: WeatherTablePresets): void {
        this.selectedPreset = preset;
        this.queryService.setQueryParam('preset', this.selectedPreset);
        this.updateTable();
    }

    private updateTable(): void {
        if (this.selectedPreset === WeatherTablePresets.HOURLY) {
            this.tableData = [...this.hourlyData];
            this.tableHeaders = this.hourlyHeaders;
        }
        if (this.selectedPreset === WeatherTablePresets.DAILY) {
            this.tableData = [...this.dailyData];
            this.tableHeaders = this.dailyHeaders;
        }
        this.cdr.markForCheck();
    }

    private checkQueryParams(): void {
        const preset = this.queryService.getQueryParamByName<WeatherTablePresets>('preset');
        const cities = this.queryService.getQueryParamByName<string>('cities');
        if (cities) {
            const arr = cities.split(',');
            this.citiesToLoad = this.citiesToLoad.concat(arr.filter((item) => this.citiesToLoad.indexOf(item) < 0));
        }
        if (preset) {
            this.selectedPreset = preset;
        } else {
            this.queryService.setQueryParam('preset', this.selectedPreset);
        }
        this.updateTable();
    }

    private loadCitiesGroup(cities: string[], addToQueryParams: boolean = true): void {
        from(cities)
            .pipe(
                switchMap((cityName) => {
                    this.loadCity(cityName, addToQueryParams);
                    return EMPTY;
                })
            )
            .subscribe();
    }

    private loadCity(cityName: string, addToQueryParams: boolean = true): void {
        this.weatherService
            .getCity(cityName)
            .pipe(
                switchMap((data) => {
                    if (!data) {
                        return this.errorService.showError(`Could not find city with name "${cityName}"`);
                    }
                    if (this.tableData?.some((item) => item.city === cityName)) {
                        return this.errorService.showError(`"${cityName}" is already added`);
                    }
                    if (addToQueryParams) {
                        this.queryService.addQueryParam('cities', cityName);
                    }
                    return of(data);
                }),
                switchMap((city) => {
                    if (!city) {
                        return EMPTY;
                    }
                    return forkJoin([
                        this.weatherService.getHourly(city.lat, city.lon),
                        this.weatherService.getDaily(city.lat, city.lon),
                    ]);
                })
            )

            .subscribe(([hourly, daily]) => {
                this.hourlyData.push({
                    city: cityName,
                    temperatures: hourly,
                });
                this.dailyData.push({
                    city: cityName,
                    temperatures: daily,
                });
                this.updateTable();
            });
    }
}
