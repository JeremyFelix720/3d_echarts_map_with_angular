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


function transformRealDataStructure(data:any[], minXValue?:number, maxXValue?:number):any {
  let dataTransformed:any[] = [];

  data.forEach((profil:any, index:number) => { // je parcours mes tableaux de profils...

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


function findAxisMinOrMaxValue(data:any[], valueToFind:"min" | "max", axis: "x" | "y" | "z"):any {
    let axisValues:number[] = [];

    for (let m = 0; m < data.length; m++) { // pour chaque profil...

      for (let n = 0; n < data.length; n++) { // pour chaque ensemble de valeurs x, y et z...

        if(axis === "x"){
          axisValues.push(data[m][n][0]);
        } else if(axis === "y"){
          axisValues.push(data[m][n][1]);
        } else if(axis === "z"){
          axisValues.push(data[m][n][2]);
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

  /*
  function updatingDisplayedProfiles(actualProfilesValues:any[]){
    console.log("actualProfilesValues=");
    console.log(actualProfilesValues); // repete en boucle le même tableau contenant 2302 tableaux de valeurs x, y, z (faisant partie du même profil)
    
    return actualProfilesValues;
  }
  */

  function findTimestampGapAverage():any {
      //let timestampProfilGap = data[actualProfileIndex][0][1] - data[actualProfileIndex-1][0][1];
      //console.log("timestampProfilGap=", timestampProfilGap);

      let timestampTotalGapAverage = 0;
      let timestampGapAverage = 0;

      for (let i = 1; i < data.length-1; i++) {
        timestampTotalGapAverage += (data[i][0][1]-data[i-1][0][1]);
        console.log("timestampTotalGapAverage=", timestampTotalGapAverage);
      }

      timestampGapAverage = Math.ceil(timestampTotalGapAverage/data.length);
      console.log("timestampGapAverage=", timestampGapAverage);


      //l'écart entre le profil 1 et 0 est : 26000
      //moyenne globale obtenue pour les 27 profils = 24286

      return timestampGapAverage;
  }

  function selectProfiles(data:any[], displayedProfiles:any[], displayedProfilesValues:any[], actualProfileIndex:number, numberOfDisplayedProfiles:number, timestampGapAverage:any):any {
    console.log("Je rentre dans la fonction addProfilesToTheGraph");

    console.log("timestampGapAverage=", timestampGapAverage);

    let actualProfiles:any[] = displayedProfiles // profils non-décortiqués
    let actualProfilesValues:any[] = displayedProfilesValues; // contiendra l'ensemble des points de tous les profils parcourrus au fur et à mesure.
    // L'index "actualProfileIndex" change à chaque entrée dans la fonction pour que "actualProfilesValues" change aussi


    /*
    MEMOS :
    
    1) Alimenter le tableau tridimentionnel "actualProfiles" en ajoutant chaque profil en fonction de l'index qui augmente progressivement

    2) Juste avant la fin de cette fonction, actualiser "actualProfilesValues" en appelant la fonction "TransformData" et lui passer "actualProfiles" en argument pour qu'il devienne un tableau bi-dimentionnel

    3) Retourner "actualProfilesValues" pour que soit cet ensemble de tableaux de valeurs [x, y, z] qui soit récupéré par eCharts.
    */


    // QUAND MON TABLEAU A ETE ENTIEREMENT PARCOURRU :
    if(actualProfileIndex+1 >= data.length){

      console.log("Tableau entièrement parcourru !");

      actualProfileIndex = 0; // je reviens au début du tableau "data" pour le parcourir.


      actualProfiles.shift(); // J'enlève le premier profil du tableau "actualProfiles".
      actualProfiles.push(data[actualProfileIndex]); // Je rajoute l'élément suivant du tableau data à la fin du tableau "actualProfiles".

      // GESTION DU TIMESTAMP DU NOUVEAU PROFIL APRES L'AVOIR RAJOUTE DANS "actualProfiles" :
      for (let i = 0; i < actualProfiles.length; i++) {
        if(i === actualProfiles.length-1){
          actualProfiles[actualProfiles.length-1][1] += timestampGapAverage;
        }
      }

    } else {

      console.log("profil "+actualProfileIndex+" =", data[actualProfileIndex]);
      // Profil 0 = 0: Array(3) [ 0, 1718632711000, 996.8 ]
      // Profil 1 = 0: Array(3) [ 0, 1718632737000, 998.3 ]
      // Profil 2 = 0: Array(3) [ 0, 1718632763000, 996.1 ]

      console.log("displayedProfiles = ", displayedProfiles);

      // de 0 à 10...
      //for (let i = actualProfileIndex; i < actualProfileIndex + numberOfDisplayedProfiles; i++) { // je parcours mes tableaux de profils...
    
        if(actualProfileIndex+1 !== numberOfDisplayedProfiles){

          actualProfiles.shift(); // J'enlève le premier profil du tableau "actualProfiles".
          actualProfiles.push(data[actualProfileIndex]); // Je rajoute l'élément suivant du tableau data à la fin du tableau "actualProfiles".

        } else { // QUAND LE NOMBRE MAXIMUM DE PROFILS AFFICHES A ETE ATTEINT :
          console.log("Nombre de profils affichables en même temps entièrement atteint");  // çà marche
      
          let firstProfile = actualProfiles.shift(); // j'enlève le premier profil du tableau.
          actualProfiles.push(firstProfile); // je rajoute le premier profil à la fin du tableau "actualProfiles".
          // Timestamp du profil 0 (foreach n°1) : 1718632737000
          // Timestamp du profil 1 (foreach n°2) : 1718632763000

        }
    
    }
    

    // PROBLEME : mon tableau de profils ne contient qu'un seul profil (avec seulement des tableaux de valeurs dedans !) à chaque lancement de la fonction "transformRealDataStructure" et c'est toujours le même profil !
    actualProfilesValues = transformRealDataStructure(actualProfiles); // j'actualise "actualProfilesValues" pour lui ajouter les tableaux de valeurs x, y, z du nouveau profil

    console.log("j'arrive au bout de la fonction selectProfiles !");

    return [actualProfiles, actualProfilesValues, actualProfileIndex];
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

  constructor(){
    this.actualProfileIndex = 0;
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
  
  // demoData = generateDemoData();
  // realDataTransformed = transformRealDataStructure(data, this.minXValue, this.maxXValue);


  numberOfPointsValuesPerProfile = data[0].length;
  numberOfDisplayedProfiles = 10; // Nombre maxi de profils affichés sur le graph
  //totalProfiles = data.length;
  delayBetweenEachAddedProfile = 5000; // en milisecondes

  timestampGapAverage = findTimestampGapAverage();
  
  selectProfilesResult = selectProfiles(data, [], [], 0, this.numberOfDisplayedProfiles, this.timestampGapAverage);
  displayedProfiles = this.selectProfilesResult[0];
  displayedProfilesValues = this.selectProfilesResult[1];
  actualProfileIndex = this.selectProfilesResult[2];
  
  interval = setInterval(() => {
    console.log("setInterval !");
    this.actualProfileIndex++;
    this.displayedProfilesValues.push(data[this.actualProfileIndex]);

    selectProfiles(data, this.displayedProfiles, this.displayedProfilesValues, this.actualProfileIndex, this.numberOfDisplayedProfiles, this.timestampGapAverage);
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
