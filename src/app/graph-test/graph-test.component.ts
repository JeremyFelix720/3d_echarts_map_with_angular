import { Component, NgModule, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxEchartsModule } from 'ngx-echarts';
// import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
// import { ECharts } from 'echarts';
// import { ECharts } from 'echarts/core';
import 'echarts-gl';
// import * as echarts from 'echarts';
// import { graphic } from 'echarts';
import data from './data.json';

function generateDemoData() {
  var demoData = [];
  for (var i = 0; i <= 50; i++) {
    for (var j = 50; j > 0; j--) {
      demoData.push([i, j, i + j]);
    }
  }
  console.log("demoData=");
  console.log(demoData);
  return demoData;
}

function transformRealDataStructure(data:any[], minXValue:number, maxXValue:number) {

  var dataTransformed:any[] = [];

  data.forEach((profil:any, index:number) => { // je parcours mes tableaux de profils...

      console.log("profil "+index+" =");
      console.log(profil);

      profil.forEach((points:any) => { // je parcours mes tableaux de points (x, y et z)...
       if((points[0] > minXValue) && (points[0] < maxXValue)){ // Cette condition permet d'enlever les rebords latéraux du graph 3d
          dataTransformed.push(points);
       }
      })
  });

  console.log("dataTransformed=");
  console.log(dataTransformed);
  return dataTransformed;
}


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

  ngOnInit(): void {
    console.log("data=");
    console.log(data);
  }

  
  // Copié-collé de : https://www.npmjs.com/package/ngx-echarts?activeTab=readme
  title = 'echarts_playground';

  minXValue = 25;
  maxXValue = 2275;

  demoData = generateDemoData();
  realDataTransformed = transformRealDataStructure(data, this.minXValue, this.maxXValue);


  chartOption: /*EChartsCoreOption*/ /*echarts.EChartsCoreOption*/ any  = {
    
    visualMap: {
      show: false,
      dimension: 2,
      //min: 0,
      //max: 4,
      inRange: {
          color: ['#313695', '#e0f3f8', '#f46d43']
      }
    },

    xAxis3D: {
      type: 'value',
      min: this.minXValue, // Permet de déterminer à partir de quand commencer à afficher l'échelle des valeurs sur l'axe X
      max: this.maxXValue // Permet de déterminer à partir de quand finir d'afficher l'échelle des valeurs sur l'axe X
    },

    yAxis3D: {
      type: 'value',
      min: data[0][1],
      max: data[data.length-1][1]
    },

    zAxis3D: {
      type: 'value',
      min: 2250,
      max: 2350
    },

    grid3D: {
      axisLine: {
        lineStyle: { color: '#fff' }
      },
      axisPointer: {
        lineStyle: { color: '#fff' }
      },
      viewControl: {
        // autoRotate: true
      },
      light: {
        main: {
          shadow: true,
          quality: 'ultra',
          intensity: 1.5
        }
      }
    },

    series: [
      {
        //type: 'scatter3D',
        //type: 'bar3D',
        type: 'surface',

        /*
        wireframe: {
          show: false
        },
        */
        
        //data: this.demoData,
        data: this.realDataTransformed,

        shading: 'lambert',
        label: {
          formatter: function (param:any) {
            return param.value[2].toFixed(1);
          }
        }
      }
    ]
  }
}
