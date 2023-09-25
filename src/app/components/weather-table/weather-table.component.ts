import { Component, OnInit, Input } from "@angular/core";
import { WeatherTableData } from "src/app/interfaces/weather";

@Component({
    selector: 'weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements OnInit {

    @Input() tableData: WeatherTableData;

    constructor() {}

    ngOnInit(): void {
        console.log('weather-table init');
    }
}