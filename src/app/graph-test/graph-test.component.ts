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

function findAxisMinOrMaxValue(data:any[], valueToFind:"min" | "max", axis: "x" | "y" | "z"):any {
    let axisValues:number[] = [];

    for (let m = 0; m < data.length; m++) { // pour chaque profil...

      for (let n = 0; n < data.length; n++) { // pour chaque ensemble de valeurs x, y et z...

        if(axis === "x"){
          axisValues.push(data[m][n][0]);
          //console.log("data[m][n][0]=" + data[m][n][0])

        } else if(axis === "y"){
          axisValues.push(data[m][n][1]);
          //console.log("data[m][n][1]=" + data[m][n][1])
        } else if(axis === "z"){
          axisValues.push(data[m][n][2]);
          //console.log("data[m][n][2]=" + data[m][n][2])
        }
      }
    }

    console.log(axisValues);

    if(valueToFind === "min"){
      console.log(`Valeur minimale de l'axe ${axis} : ${Math.min(...axisValues)}.`);
      return Math.min(...axisValues);
    } else if (valueToFind === "max") {
      console.log(`Valeur maximale de l'axe ${axis} : ${Math.max(...axisValues)}.`);
      return Math.max(...axisValues);
    }
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

  minXValue = 50; // findAxisMinOrMaxValue(data, "min", "x");
  maxXValue = 2275; // findAxisMinOrMaxValue(data, "max", "x");

  minYValue = findAxisMinOrMaxValue(data, "min", "y");
  maxYValue = findAxisMinOrMaxValue(data, "max", "y");

  minZValue = findAxisMinOrMaxValue(data, "min", "z");
  maxZValue = findAxisMinOrMaxValue(data, "max", "z");

  demoData = generateDemoData();
  realDataTransformed = transformRealDataStructure(data, this.minXValue, this.maxXValue);


  chartOption: /*EChartsCoreOption*/ /*echarts.EChartsCoreOption*/ any  = {
    
    visualMap: {
      show: false,
      dimension: 2,
      min: 2295, // valeur de z la plus faible
      max: 2315, // valeur de z la plus haute
      inRange: {
        color: [
          '#313695', // bleu
          '#a50026', // rouge
          '#ffffbf', // beige
        ]
      }
    },

    xAxis3D: {
      name: "Largeur (milimètres)",
      type: 'value',
      min: this.minXValue, // Permet de déterminer à partir de quand commencer à afficher l'échelle des valeurs sur l'axe X
      max: this.maxXValue, // Permet de déterminer à partir de quand finir d'afficher l'échelle des valeurs sur l'axe X
      interval: 200
    },

    yAxis3D: {
      name: "Longueur (milisecondes)",
      type: 'value',
      min: this.minYValue, //data[0][1],
      max: this.maxYValue, //data[data.length-1][1]
      interval: 100000
    },

    zAxis3D: {
      name: "Épaisseur (micromètres)",
      type: 'value',
      min: this.minZValue+1800, //2100
      max: this.maxZValue, //2500
      interval: 50
    },

    grid3D: {
      axisLine: {
        lineStyle: { color: '#000' }
      },
      axisPointer: {
        lineStyle: { color: '#000' }
      },
      viewControl: {
        // autoRotate: true
      },
      light: {
        main: {
          shadow: false,
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

        
        wireframe: {
          show: false
        },

        //data: this.demoData,
        data: this.realDataTransformed,

        shading: "lambert",  //"color",
        label: {
          formatter: function (param:any) {
            return param.value[2].toFixed(1);
          }
        }
      }
    ]
  }
}
