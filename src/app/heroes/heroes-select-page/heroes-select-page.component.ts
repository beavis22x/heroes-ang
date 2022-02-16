import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-select-page.component.html',
  styleUrls: ['./heroes-select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesSelectPageComponent { }
