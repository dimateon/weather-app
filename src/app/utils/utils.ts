import { WeatherTableDays, WeatherTableSizes } from "../constants/weather";

export function getHourlyHeaders(count: number = WeatherTableSizes.HOURLY, step: number = 3): string[] {
    const currentDate = new Date();
    const res: string[] = [addZerosToHours(currentDate.getHours())];
    while(res.length < count) {
        currentDate.setTime(currentDate.getTime() + step * 60 * 60 * 1000);
        res.push(addZerosToHours(currentDate.getHours()));
    }
    return res;
}

export function getDailyHeaders(count: number =  WeatherTableSizes.DAILY): string[] {
    const currentDate = new Date();
    const res: string[] = [WeatherTableDays[currentDate.getDay() - 1]];
    while (res.length < count) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() - 1 < 0) {
            res.push(WeatherTableDays[count - 1]);
        } else {
            res.push(WeatherTableDays[currentDate.getDay() - 1]);
        }
    }
    return res;
}

export function addZerosToHours(hours: number): string {
    return ('0' + hours).slice(-2) + ':00';
}