import { Component, NgModule } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxEchartsModule } from 'ngx-echarts';
//import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
// import { ECharts } from 'echarts';
// import { ECharts } from 'echarts/core';
import 'echarts-gl';
// import * as echarts from 'echarts';
// import { graphic } from 'echarts';


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
  
  title = 'echarts_playground';
  
  
  measureDatas = [[[1, 0, 1], [0, 1, 0], [1, 0, 1]], [[1, 0, 1], [0, 1, 0], [1, 0, 1]]];
  profilIndex = 0;
  valueIndex = 0;
  
  chartOption: /*EChartsCoreOption*/ /*echarts.EChartsCoreOption*/ any  = {
    
    // Démo copiée-collée de : https://www.npmjs.com/package/ngx-echarts?activeTab=readme
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
      data: [-0.4, 0.25, -0.8],
      type: 'value'
    },
    yAxis3D: {
      data: [-0.8, 0.5, -0.7],
      type: 'value'
    },
    zAxis3D: {
      data: [-0.6, 0.7, -0.5],
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
        show: false // Gestion de l'affichage des quadriages
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
      
      //equation: {
        x: {
          //step: 0.05,
          
          min: -1,
          max: 1,
          //data: [0.6, 0.2, -0.8],
          //index: -1,

          // this.assignProfilValues("x")
        },
        y: {
          //step: 0.05,
          
          min: -1,
          max: 1,
          //data: [-0.7, 0.4, -0.3],
          //index: -1,
          
          // this.assignProfilValues("y")
        },
        z: {
          //step: 0.05,

          min: -1,
          max: 1,
          //data: [-0.3, 0.7, -0.2],
          //index: -1,

          // this.assignProfilValues("z")
        //}

          /*
          function (x:number, y:number) {
            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-';
            }
            return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
            
            
          }
          */
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

  // Cette fonction permet, pour chaque profil, de parcourir chaque valeur soit de x, soit de y, soit de z dans tous le tableau de données.
  assignProfilValues( /*profilIndex:number, valueIndex:number,*/ axis:string) {
    let data = this.measureDatas;

    //let profilLength = data.length;
    //let profilValuesLength = data[0].length;


    for (let m = 0; m < data.length; m++) { // pour chaque profil...

      for (let n = 0; n < data.length; n++) { // pour chaque ensemble de valeurs x, y et z...

        if(axis === "x"){
          this.chartOption.series.equation.x = data[m][n][0];
        } else if(axis === "y"){
          this.chartOption.series.equation.y = data[m][n][1];
        } else if(axis === "z"){
          this.chartOption.series.equation.z = data[m][n][2];
        }      
      }
    }
    
  }

  /*
  ngOnInit() {
    this.chartOption.serie.equation = {5, 5}
  }
  */
  
}
