export interface WeatherTableData {
    city: string;
    temperatures: number[];
}

export interface WeatherCity {
    name: string;
    lat: number;
    lon: number;
}

export enum WeatherTablePresets {
    HOURLY = 'hourly',
    DAILY = 'daily',
}