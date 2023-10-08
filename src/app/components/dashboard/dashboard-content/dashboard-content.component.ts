import { Component, OnInit } from '@angular/core';
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

export class DashboardContentComponent implements OnInit {

  posts: any = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("barchart") barchart: ChartComponent;
  public BarChartOptions: Partial<BarChartOptions>;

  constructor(private apiService: Getapi) {
    this.chartOptions = {
      series: [44, 55, 10, 21, 19],
      chart: {
        type: "donut"
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

    this.BarChartOptions = {
      series: [
        {
          name: "Total sales this year",
          data: [80, 68, 101, 51, 95, 72]
        }
      ],
      chart: {
        type: "bar",
        height: 250
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Seller A",
          "Seller B",
          "Seller C",
          "Seller D",
          "Seller E",
          "Seller F"
        ]
      }
    };
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((response: any) => {
      this.posts = response.results;
      console.log(this.posts);
    });
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
