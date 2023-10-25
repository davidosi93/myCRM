import { Component, Injectable, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import { Getapi } from 'src/app/shared/services/getapi.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { Observable, forkJoin, from, map, mergeMap, of } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class DashboardContentComponent implements OnInit {
  posts: any = [];
  allCustomers: any;
  disabled = false;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("barchart") barchart: ChartComponent;
  public BarChartOptions: Partial<BarChartOptions>;

  constructor(private apiService: Getapi, public customerService: CustomerService, private customerDetail: CustomerDetailComponent) {
    this.chartOptions = {
      series: [44, 55, 10, 21, 19],
      chart: {
        type: "donut",
        foreColor: 'var(--main-content-text-color)'
      },
      labels: ["Lamborghini", "Ferrari", "Bugatti", "Aston Martin", "Bentley"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((response: any) => {
      this.posts = response.results;
    });
    this.loadCustomersWithNotes();
  }

  loadCustomersWithNotes(): void {
    this.customerService.getCustomersWithIds()
      .pipe(
        mergeMap(customers => {
          if (customers.length === 0) {
            return of([]);
          }
          return this.loadCustomersWithNotesDetails(customers);
        })
      )
      .subscribe(allCustomers => {
        this.updateAllCustomersList(allCustomers);
      });
  }

  loadCustomersWithNotesDetails(customers: any[]): Observable<any[]> {
    const notesPromises = customers.map(customer => {
      return from(this.customerDetail.getNotesForCustomer(customer.id))
        .pipe(
          map(notes => ({ ...customer, notesLength: notes.length }))
        );
    });
    return forkJoin(notesPromises);
  }

  updateAllCustomersList(allCustomers: any[]): void {
    if (allCustomers.length === 0) {
      this.disabled = true;
      this.allCustomers = [{ firstName: 'No customers yet' }];
    } else {
      this.allCustomers = allCustomers;
      this.disabled = false;
    }
  }

  getImageUrls(post) {
    if (post && post.media) {
      return post.media.map(mediaItem => {
        if (mediaItem["media-metadata"] && mediaItem["media-metadata"][1]) {
          return mediaItem["media-metadata"][1].url;
        } else {
          return "standard-image-url.jpg";
        }
      });
    } else {
      return [];
    }
  }
}
