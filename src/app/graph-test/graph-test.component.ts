import { Component, NgModule } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import 'echarts-gl';
import data from './data.json';

/*
function generateDemoData() {
  let demoData = [];
  for (let i = 0; i <= 50; i++) {
    for (let j = 50; j > 0; j--) {
      demoData.push([i, j, i + j]);
    }
  }
  console.log("demoData=");
  console.log(demoData);
  return demoData;
}
*/

// OK
function transformRealDataStructure(updatedData:any[], minXValue?:number, maxXValue?:number):any {
  let dataTransformed:any[] = [];

  updatedData.forEach((profil:any, index:number) => { // je parcours mes tableaux de profils...

      profil.forEach((points:any) => { // je parcours mes tableaux de points (x, y et z)...
       //if((points[0] > minXValue) && (points[0] < maxXValue)){ // Cette condition permet d'enlever les rebords latéraux du graph 3d
          dataTransformed.push(points);
      // }
      })
  });
  console.log("dataTransformed=");
  console.log(dataTransformed);
  return dataTransformed;
}

// OK
function findAxisMinOrMaxValue(updatedData:any[], valueToFind:"min" | "max", axis: "x" | "y" | "z"):any {
    let axisValues:number[] = [];

    for (let m = 0; m < updatedData.length; m++) { // pour chaque profil...

      for (let n = 0; n < updatedData.length; n++) { // pour chaque ensemble de valeurs x, y et z...

        if(axis === "x"){
          axisValues.push(updatedData[m][n][0]);
        } else if(axis === "y"){
          axisValues.push(updatedData[m][n][1]);
        } else if(axis === "z"){
          axisValues.push(updatedData[m][n][2]);
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

  // OK
  function findTimestampGapAverage(updatedData:any[]):any {
      
      let timestampTotalGapAverage = 0;
      let timestampGapAverage = 0;
      
      for (let i = 1; i < updatedData.length-1; i++) {
        timestampTotalGapAverage += (updatedData[i][0][1]-updatedData[i-1][0][1]);
        //console.log("timestampTotalGapAverage=", timestampTotalGapAverage);
      }
      
      timestampGapAverage = Math.ceil(timestampTotalGapAverage/updatedData.length);
      console.log("timestampGapAverage=", timestampGapAverage);

      //l'écart entre le profil 1 et 0 est : 26000
      //moyenne globale obtenue pour les 27 profils initiaux est : 24286
      
      return timestampGapAverage;
  }

  function selectProfiles(updatedData:any[], displayedProfilesValues:any[], actualProfileIndex:number, numberOfDisplayedProfiles:number):any {
    console.log("Je rentre dans la fonction selectProfiles");

    let actualProfiles:any[] = [] // profils non-décortiqués


    // OK !
    //console.log(`updatedData[${actualProfileIndex}]=`);
    //console.log(updatedData[actualProfileIndex]);
    // updatedData[0] = Array(3) [ 0, 1718632711000, 996.8 ]
    // updatedData[1] = Array(3) [ 0, 1718632737000, 998.3 ]
    // updatedData[2] = Array(3) [ 0, 1718632763000, 996.1 ]


    updatedData[actualProfileIndex].forEach((points:any) => {
      displayedProfilesValues.push(points);
    });

    console.log(`actualProfiles à l'index ${actualProfileIndex}`);
    console.log(actualProfiles);

    /*
    "actualProfiles" à l'index 30 :

    Array(31) [ (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], (2302) […], … ]
    0: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718632783858, 996.8 ]"
    1: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718632979860, 998.3 ]"
    2: Array(2302) [ (3) […], (3) […], (3) […], … ]
    3: Array(2302) [ (3) […], (3) […], (3) […], … ]
    (...)
    26: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718633658146, 997.6 ]"
    27: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718633684146, 998.8 ]"
    28: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718633026718, 996.8 ]"
    29: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718633052718, 998.3 ]"
    30: Array(2302) [ (3) […], (3) […], (3) […], … ] > ex. : "0: Array(3) [ 0, 1718633103004, 996.1 ]"
    ​*/

    
    // CETTE PARTIE EST A REVOIR !
    if(actualProfileIndex+1 === numberOfDisplayedProfiles) { // QUAND LE NOMBRE MAXIMUM DE PROFILS AFFICHES A ETE ATTEINT :
      console.log("Nombre de profils affichables en même temps entièrement atteint");
  
      actualProfiles.shift(); // J'enlève le premier profil du tableau "actualProfiles".
      actualProfiles.push(updatedData[actualProfileIndex]);
    }
    
    console.log(`displayedProfilesValues à l'index ${actualProfileIndex} =`);
    console.log(displayedProfilesValues);
    console.log("j'arrive au bout de la fonction selectProfiles !");
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

  constructor(){}

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
  }

  // Copié-collé de : https://www.npmjs.com/package/ngx-echarts?activeTab=readme
  title = 'echarts_playground';

  // demoData = generateDemoData();
  // realDataTransformed = transformRealDataStructure(data, this.minXValue, this.maxXValue);
  originalData = data;
  updatedData = data;
  dataIndex = 0; //dataIndex ne commence à augmenter que lorsque on arrive à la fin du tab data


  minXValue = 50; // findAxisMinOrMaxValue(data, "min", "x");
  maxXValue = 2275; // findAxisMinOrMaxValue(data, "max", "x");

  minYValue = findAxisMinOrMaxValue(this.updatedData, "min", "y");
  maxYValue = findAxisMinOrMaxValue(this.updatedData, "max", "y");

  minZValue = findAxisMinOrMaxValue(this.updatedData, "min", "z");
  maxZValue = findAxisMinOrMaxValue(this.updatedData, "max", "z");
  
  //numberOfPointsValuesPerProfile = data[0].length;
  numberOfDisplayedProfiles = 10; // Nombre maxi de profils affichés sur le graph
  //totalProfiles = data.length;
  delayBetweenEachAddedProfile = 10000; // en milisecondes

  timestampGapAverage = findTimestampGapAverage(this.updatedData);
  
  selectProfilesResult = [];
  displayedProfiles = [];
  displayedProfilesValues = [];
  actualProfileIndex = 0;

  interval = setInterval(() => {
    console.log("setInterval !");

    // SI MON TABLEAU "updatedData" A ETE ENTIEREMENT PARCOURRU alors JE LUI RAJOUTE UN PROFIL SUPPLEMENTAIRE :
    // OK !!
    if(this.actualProfileIndex+1 === this.updatedData.length){

      console.log("Tableau entièrement parcourru !");

      let dataProfileToAdd = this.updatedData[this.dataIndex];

      //console.log(`dataProfileToAdd à l'index ${this.dataIndex} =`);
      //console.log(dataProfileToAdd);

      dataProfileToAdd.forEach((points:number[]) => { // je parcours mes tableaux de points (x, y et z)...
        //console.log("points");
        //console.log(points);
        points[1] += this.timestampGapAverage;
      })
      
      this.updatedData.push(dataProfileToAdd); // Je rajoute mon profil mis à jour à la fin de mon tableau updatedData.
      //console.log("updatedData =");
      //console.log(data);

      console.log("this.timestampGapAverage="+this.timestampGapAverage);
      this.dataIndex++;
    }

    selectProfiles(this.updatedData, this.displayedProfilesValues, this.actualProfileIndex, this.numberOfDisplayedProfiles);

    console.log("Number of profiles: %d", this.displayedProfilesValues.length)

    this.actualProfileIndex += 1;

  }, this.delayBetweenEachAddedProfile);

  chartOption: /*EChartsCoreOption*/ /*echarts.EChartsCoreOption*/ any  = {
    visualMap: {
      show: true,
      dimension: 2,
      min: 2295, // valeur de z la plus faible
      max: 2315, // valeur de z la plus haute
      inRange: {
        color: ['#440154', '#404387', '#29788E', '#22A784', '#79D151', '#FDE724']
        /*
        Thèmes enregistrés dans FlexCan :
        Viridis : ['#440154', '#404387', '#29788E', '#22A784', '#79D151', '#FDE724']
        Inferno : ['#000003', '#410967', '#932567', '#DC5039', '#FBA40A', '#FCFEA4']
        Blue-red : ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]
        Blue : ["#242870", "#313695", "#4575b4", "#74add1", "#abd9e9", "#d5eff6"]
        Grey : ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff']
        */
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
        //autoRotate: true
      },
      boxHeight: 50, // Hauteur de l'axe Z
      boxWidth: data.length * 10, // Largeur de l'axe Y
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
        smooth: true,

        //type: 'scatter3D',
        //type: 'bar3D',
        type: 'surface',

        wireframe: {
          show: false // Permet d'afficher ou non le quadriage du graph 3d
        },

        //data: this.demoData,
        //data: this.realDataTransformed,  // CETTE LIGNE PERMET D'AFFICHER TOUS LES PROFILS D'UN COUP ET DE FACON STATIQUE
        data: this.displayedProfilesValues,

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
