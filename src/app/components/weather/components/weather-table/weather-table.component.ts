import { CommonModule } from "@angular/common";
import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {WeatherTableData} from "src/app/interfaces/weather";
import { getDailyHeaders, getHourlyHeaders } from "src/app/utils/utils";

@Component({
    selector: 'weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class WeatherTableComponent implements OnInit {

    @Input() tableData: WeatherTableData;
    @Input() tableHeaders: string[];

    public mockHeaders: string[] = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']

    constructor() {}

    ngOnInit(): void {
        console.log('weather-table init');
        getHourlyHeaders();
        getDailyHeaders();
    }
}
