import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

import { Observable, catchError, map, tap } from 'rxjs';
import { WeatherCity } from "../interfaces/weather";
import { ErrorService } from "./error.service";

@Injectable({ providedIn: 'root' })
export class WeatherService {
    private readonly API_KEY = environment.apiKey;

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    public getCity(cityName: string): Observable<WeatherCity> {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.API_KEY}`;
        return this.http.get<WeatherCity[]>(url).pipe(
            catchError(() => this.errorService.showError()),
            map((city) => ({
                name: city[0].name,
                lat: city[0].lat,
                lon: city[0].lon
            })),
        )
    }
}