import { Component, NgModule, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { ECharts } from 'echarts';
// import { ECharts } from 'echarts/core';
import 'echarts-gl';
import * as echarts from 'echarts';
import { graphic } from 'echarts';


@Component({
  selector: 'app-graph-test',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graph-test.component.html',
  styleUrl: './graph-test.component.scss',
  providers: [
    provideEcharts(),
  ]
})

export class GraphTestComponent /*implements OnInit*/ {

  @NgModule({
    imports: [
      NgxEchartsModule.forRoot({
        /**
         * This will import all modules from echarts.
         * If you only need custom modules,
         * please refer to [Custom Build] section.
         */
        echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
      }),
    ],
  })
  
  // Copié-collé de : https://www.npmjs.com/package/ngx-echarts?activeTab=readme
  title = 'echarts_playground';
  

  chartOption: EChartsOption = {

    /*
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
    */
    

    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      //data: [2, 3, 8, 9, 4],
      type: 'value',
    },
    yAxis3D: {
      //data: [12, 6, 8, 3, 7],
      type: 'value',
    },
    zAxis3D: {
      //data: [12, 6, 8, 3, 7],
      type: 'value',      
    },
    grid3D: {
      viewControl: {
        // projection: 'orthographic'
      }
    },

    /*
    series: [{
      type: 'map',
      symbolSize: 50,
      data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
      itemStyle: {
          opacity: 1
      }
    }]
    */

    /*
    series: [
      {
        //data: [820, 932, 901, 934, 1290, 1330, 1320]
        //data: [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}],

        data: [],
        type: 'surface',
        wireframe: {
          // show: false
        },
        // equation: {
        //   x: {
        //     step: 0.05
        //   },
        //   y: {
        //     step: 0.05
        //   },
        //   z: function (x:number, y:number) {
        //     if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        //       return '-';
        //     }
        //     console.log("FONCTION DU Z")
        //     return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
        //   }
        // }
      }
    ]
    */
   
  }

  /*
  ngOnInit() {
    this.chartOption.serie.equation = {5, 5}
  }
  */
  
}
