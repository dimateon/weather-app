import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class WeatherSearchComponent {

  public input: string = '';

  @Output() addCity = new EventEmitter<string>();

  public addHandler(): void {
    this.addCity.emit(this.input);
  }
}
