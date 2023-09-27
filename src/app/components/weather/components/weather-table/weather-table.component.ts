import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WeatherTableData } from 'src/app/interfaces/weather';
import { KalvinToCelsiusPipe } from '../../../../pipes/temperature-converter.pipe';

@Component({
    selector: 'weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, KalvinToCelsiusPipe],
})
export class WeatherTableComponent {
    @Input() tableData: WeatherTableData[];
    @Input() tableHeaders: string[];
}
