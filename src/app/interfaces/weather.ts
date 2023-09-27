export interface WeatherTableData {
    city: string;
    temperatures: number[];
}

export interface WeatherCity {
    name: string;
    lat: number;
    lon: number;
}

export interface WeatherCityDTO {
    country: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
}

export interface WeatherDailyDTO extends WeatherItemDTO {
    daily: WeatherDayDTO[];
}

export interface WeatherHourlyDTO extends WeatherItemDTO {
    hourly: WeatherHourDTO[];
}

export interface WeatherItemDTO {
    lat: number;
    lon: number;
}

export interface WeatherHourDTO {
    dt: number;
    temp: number;
}

export interface WeatherDayDTO {
    dt: number;
    temp: TempDayItem;
}

export interface TempDayItem {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}
