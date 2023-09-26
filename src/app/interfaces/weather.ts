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
    local_names: any;
    lon: number;
    name: string;
    state: string;
}

export interface WeatherDailyDTO extends WeatherItemDTO {
    daily: WeatherMomentDTO[];
}

export interface WeatherHourlyDTO extends WeatherItemDTO {
    hourly: WeatherMomentDTO[];
}

export interface WeatherItemDTO {
    lat: number;
    lon: number;
}

export interface WeatherMomentDTO {
    dt: number;
    temp: TempDayItem | number;
}

export interface TempDayItem {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}


