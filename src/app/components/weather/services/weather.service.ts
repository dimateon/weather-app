import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

import { Observable, catchError, map } from 'rxjs';
import { WeatherCity, WeatherCityDTO, WeatherDailyDTO, WeatherHourlyDTO } from "../../../interfaces/weather";
import { ErrorService } from "../../../services/error.service";
import { WeatherTableSizes } from "src/app/constants/weather";

@Injectable()
export class WeatherService {
    private readonly API_KEY = environment.apiKey;

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    public getCity(cityName: string): Observable<WeatherCity> {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.API_KEY}`;
        return this.http.get<WeatherCityDTO[]>(url).pipe(
            catchError(() => this.errorService.showError()),
            map((city) => {
                if (!city.length) {
                    return null;
                }
                return {
                    name: city[0].name,
                    lat: city[0].lat,
                    lon: city[0].lon
                }
            }),
        )
    }

    public getHourly(lat: number, lon: number): Observable<any> {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this.API_KEY}`;

        return this.http.get<WeatherHourlyDTO>(url).pipe(
            catchError(() => this.errorService.showError()),
            map((data) => this.mapHourly(data))
        )
    }

    public getDaily(lat: number, lon: number): Observable<any> {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this.API_KEY}`;

        return this.http.get<WeatherDailyDTO>(url).pipe(
            catchError(() => this.errorService.showError()),
            map((data) => this.mapDaily(data))
        )
    }

    private mapHourly(data: WeatherHourlyDTO): any {
        // const filtered = data.hourly;
        // console.log(filtered)
        // const filtered = data.hourly.slice(0, 24)
        //     .filter((item, index) => new Date(item.dt * 1000).getHours() !== 0 && new Date(item.dt * 1000).getHours() % 3 === 0)
        //     .sort((a, b) => a.dt - b.dt);
        // for (let i = 0; )
        // const q = filtered.filter((item, index) => index % 3 ===0);
        // // console.log(q);
        // q.map((item) => {
        //     console.log(new Date(item.dt * 1000))
        // })

        const filtered = data.hourly.filter((item, index) => index % 3 ===0).map((item) => item.temp).slice(0, WeatherTableSizes.HOURLY);
        // console.log(filtered);
        return filtered;
    }

    private mapDaily(data: WeatherDailyDTO): any {
        // console.log('daily: ', data.daily);
        data.daily.map((day) => {
            console.log(new Date(day.dt * 1000).getDay());
        })
        return data;
    }
}
