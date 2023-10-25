import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMobile = false;
  public isLightTheme = true;
  lightText: string = 'Dark Mode';
  isChecked: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.isLightTheme = true;
    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isMobile = matches;
      });
  }

  closeSidenav() {
    this.sidenav.close();
  }

  closeSidenavMobile() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  onThemeSwitchChange() {
    this.isChecked = !this.isChecked;
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      this.lightText = 'Dark Mode';
    } else if (!this.isLightTheme) {
      this.lightText = 'Light Mode';
    }
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
