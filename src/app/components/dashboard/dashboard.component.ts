import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMobile = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isMobile = matches;
        console.log(this.isMobile);

      });
  }

  closeSidenav() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
}
