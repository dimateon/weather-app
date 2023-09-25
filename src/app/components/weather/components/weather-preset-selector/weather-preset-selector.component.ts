import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {WeatherTablePresets} from "../../../../interfaces/weather";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'weather-preset-selector',
  templateUrl: './weather-preset-selector.component.html',
  styleUrls: ['./weather-preset-selector.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule]
})
export class WeatherPresetSelectorComponent implements OnInit {
  @Output() selected = new EventEmitter<WeatherTablePresets>();
  @Input() presets: string[];
  @Input() selectedPreset: WeatherTablePresets;

  public _selectedPreset: WeatherTablePresets = WeatherTablePresets.HOURLY;

  ngOnInit() {
    if (this.selectedPreset) {
      this._selectedPreset = this.selectedPreset;
    }
  }

  public changeHandler(): void {
    this.selected.emit(this._selectedPreset);
  }
}
