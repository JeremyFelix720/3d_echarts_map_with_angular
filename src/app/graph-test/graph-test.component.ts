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
  

  chartOption: /*EChartsCoreOption*/ /*echarts.EChartsCoreOption*/ any  = {

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
    visualMap: {
      max: 1,
      inRange: {
        color: ['#d94e5d', '#eac736', '#50a3ba']
      }
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        projection: 'perspective'
      }
    },
    series: [{
      type: 'surface', // Essayer toutes les combinaisons suivantes (dans les types de données acceptées par l'interface "RegisteredSeriesOption") : line, bar, scatter, pie, radar (yes), map, tree, treemap, graph (yes), gauge, funnel, parallel, sankey, boxplot, candlestick, effectScatter, lines, heatmap, pictorialBar, themeRiver, sunburst, custom
      wireframe: {
        // show: false
      },
      symbolSize: 50,
      /*
      data: [
        [-1, -1, -1], 
        [0, 0, 0], 
        [1, 1, 1]
      ],
      */
     itemStyle: {
       opacity: 1 // Gère la transparence du graph
     },
      equation: {
        x: {
          // data: [-1, 1, -1],
          step: 0.05
        },
        y: {
          //data: [-1, 1, -1],
          step: 0.05
        },
        z: function (x:number, y:number) {
            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-';
            }
            return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
        }
      }
    }]
      

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
