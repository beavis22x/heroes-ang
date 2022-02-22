import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-hero-info',
  templateUrl: './user-hero-info.component.html',
  styleUrls: ['./user-hero-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHeroInfoComponent {
}
