import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../utils/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {

  constructor(private auth: AuthService) {
  }

  public logout(): void {
    this.auth.logOut();
  }
}
