import { Component, NgModule, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxEchartsModule } from 'ngx-echarts';
//import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
// import { ECharts } from 'echarts';
// import { ECharts } from 'echarts/core';
import 'echarts-gl';
// import * as echarts from 'echarts';
// import { graphic } from 'echarts';
import data from './data.json';


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

export class GraphTestComponent implements OnInit {

  /*
  constructor(){
    
    this.measureDatas = data;
    
    console.log('data=', data);
    //console.log('measureDatas=', this.measureDatas);
  }
  */

  ngOnInit(): void {
    this.measureDatas = data;
    console.log('data2=', data);

  }

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
  


  // Cette fonction permet, pour chaque profil, de parcourir chaque valeur soit de x, soit de y, soit de z dans tous le tableau de données. OK
  selectAxisValuesForAllProfils(axis: "x" | "y" | "z", data:any[]) {
    //let data = this.measureDatas;
    let axisValues:any[] = [];

    console.log("measureDatas="); // OK, le tableau est complet !
    console.log(data); // Le résultat s'affiche en violet dans la console (au début)

    for (let m = 0; m < data.length; m++) { // pour chaque profil...

      for (let n = 0; n < data.length; n++) { // pour chaque ensemble de valeurs x, y et z...

        if(axis === "x"){
          axisValues.push(data[m][n][0]);
          console.log("data[m][n][0]=" + data[m][n][0])
        } else if(axis === "y"){
          axisValues.push(data[m][n][1]);
          console.log("data[m][n][1]=" + data[m][n][1])

        } else if(axis === "z"){
          axisValues.push(data[m][n][2]);
          console.log("data[m][n][2]=" + data[m][n][2])

        }      
      }
    }

    console.log(`axisValues for axis "${axis}" de longueur ${axisValues.length}`) // Il y a une longueur de 784 éléments pour chacun des axes.
    console.log(axisValues);

    return axisValues;
  };



  title = 'echarts_playground';
  measureDatas:any[] = data; // Où la valeur data est-elle assignée ?

  /*
  profilIndex = 0;
  valueIndex = 0;
  */

  xValues = this.selectAxisValuesForAllProfils("x", this.measureDatas);
  yValues = this.selectAxisValuesForAllProfils("y", this.measureDatas);
  zValues = this.selectAxisValuesForAllProfils("z", this.measureDatas);


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
    legend: {},
    visualMap: {
      max: 2,
      inRange: {
        color: ['#d94e5d', '#eac736', '#50a3ba']
      }
    },
    xAxis3D: {
      //show: true,
      //data: [-0.4, 0.25, -0.8],
      //data: "xAxis3D",
      type: 'value',
      data: this.xValues
    },
    yAxis3D: {
      //show: true,
      //data: [-0.8, 0.5, -0.7],
      //data: "yAxis3D",
      type: 'value',
      data: this.yValues
    },
    zAxis3D: {
      //show: true,
      //data: [-0.6, 0.7, -0.5],
      //data: "zAxis3D",
      type: 'value',
      data: this.zValues
    },
    grid3D: {
      viewControl: {
        projection: 'perspective'
      }
    },
    

    // Copié-collé de la démo du tuto suivant : https://echarts.apache.org/handbook/en/concepts/dataset/
    /*
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
    },
    yAxis: {},
    */


    series: [

      /*
      // Copié-collé de la démo du tuto suivant : https://echarts.apache.org/handbook/en/concepts/dataset/
      {
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4]
      },
      {
        type: 'bar',
        name: '2016',
        data: [95.8, 89.4, 91.2, 76.9]
      },
      {
        type: 'bar',
        name: '2017',
        data: [97.7, 83.1, 92.5, 78.1]
      }
      */

      

      /*
      {
        type: 'surface',
        wireframe: {
          show: false // Gestion de l'affichage des quadriages
        },

        symbolSize: 50,
                
        itemStyle: {
          opacity: 1 // Gère la transparence du graph
        },
      },
      */
      

      
      {
        type: 'surface',
        //name: 'x',
        data: this.xValues,  // [1, 0, 2, 4], // Attribut obligatoire pour que le graph s'affiche
        min: 0,
        max: 30
      },

      {
        type: 'surface',
        //name: 'y',
        data: this.yValues, // [2, 1, 3, 1], // Attribut obligatoire pour que le graph 
        min: 0,
        max: 2000000000000
      },

      {
        type: 'surface',
        //name: 'z',
        data: this.zValues, // [2, 4, 2, 0], // Attribut obligatoire pour que le graph 
        min: 0,
        max: 3000
      },
      

      /*
      equation: {
        x: {
          //step: 0.05,
          //min: -1,
          //max: 1,
          values: this.xValues,

          data: function() { // CETTE FONCTION N'EST JAMAIS EXECUTEE !
            for (let i = 0; i < this.values.length; i++) {
              console.log("X > this.values=" + this.values);
              return this.values[i];
            }
          }
        },
        y: {
          //step: 0.05,
          //min: -1,
          //max: 1,
          values: this.yValues,

          data: function() { // CETTE FONCTION N'EST JAMAIS EXECUTEE !
            for (let i = 0; i < this.values.length; i++) {
              console.log("Y > this.values=" + this.values);
              return this.values[i];
            }
          }
        },
        z: {
          //step: 0.05,
          //min: -1,
          //max: 1,
          values: this.zValues,

          data: function() { // CETTE FONCTION N'EST JAMAIS EXECUTEE !
            for (let i = 0; i < this.values.length; i++) {
              console.log("Z > this.values=" + this.values);
              return this.values[i];
            }
          }
          
          function (x:number, y:number) {
            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-';
            }
            return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
          }
          
        }
      }
      */
     
    ]
    
      
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
  // Cette fonction permet, pour chaque profil, de parcourir chaque valeur soit de x, soit de y, soit de z dans tous le tableau de données.
  assignProfilValues(axis:string) {
    let data = this.measureDatas;

    console.log("measureDatas=" + data);

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
  */
}
