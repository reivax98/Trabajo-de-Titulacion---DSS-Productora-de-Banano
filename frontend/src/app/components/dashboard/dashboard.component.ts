import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChartsService } from '../../services/charts.service';
import { Chart } from 'chart.js';
import { DsIngresos } from '../../models/ds-ingresos';
import { DsEgresos } from '../../models/ds-egresos';


function borrarGraficos(grafico) {
  grafico.data.datasets = [] //Desired Data
  grafico.update();
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ChartsService, UserService]
})
export class DashboardComponent implements OnInit {

  public token: any;
  public dsfac: DsIngresos[];
  public dsfac2: DsEgresos[];
  public lab: any[];
  public lab2: any[];
  public lab3: any[];
  public lab4: any[];
  public dat: any[];
  public dat2: any[];

  public dsfacn: DsIngresos[];
  public dsfac2n: DsEgresos[];
  public labn: any[];
  public lab2n: any[];
  public lab3n: any[];
  public lab4n: any[];
  public datn: any[];
  public dat2n: any[];

  public canvas: any;
  public ctx: any;
  public canvas2: any;
  public ctx2: any;
  public canvas3: any;
  public ctx3: any;
  public canvas4: any;
  public ctx4: any;

  public myBarChart: any;
  public myBarChart2: any;
  public myBarChart3: any;
  public myBarChart4: any;

  public ing_rec: any;
  public eg_rec: any;
  public ma_prov_nom: any;
  public ma_prov_tot: any;
  public ing_anual_anio: any;
  public ing_anual_tot: any;
  public tipo_grafico: any;
  public anio: number;
  @ViewChild('mychart') mychart: any;
  @ViewChild('mychart2') mychart2: any;
  @ViewChild('mychartn') mychartn: any;
  @ViewChild('mychart2n') mychart2n: any;

  constructor(
    private chartsService: ChartsService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.dsfac = [];
    this.dsfac2 = [];
    this.lab = [];
    this.lab2 = [];
    this.lab3 = [];
    this.lab4 = [];
    this.dat = [];
    this.dat2 = [];

    this.dsfacn = [];
    this.dsfac2n = [];
    this.labn = [];
    this.lab2n = [];
    this.lab3n = [];
    this.lab4n = [];
    this.datn = [];
    this.dat2n = [];

    this.ing_rec = null;
    this.eg_rec = null;
    this.ma_prov_nom = null;
    this.ma_prov_tot = null;
    this.ing_anual_anio = null;
    this.ing_anual_tot = null;
    this.tipo_grafico = 'Semana';
    this.anio = 2022;
  }

  ngOnInit(): void {
    this.getGraficos2(this.tipo_grafico, this.anio)
    this.getCabeceras()
  }

  getCabeceras() {
    setTimeout(() => {
      this.chartsService.getIngresoReciente(this.userService.getToken()).subscribe(
        res => {
          if (res.datos) {
            this.ing_rec = res.datos.total
          }
        },
        err => console.log(err)
      )
      this.chartsService.getEgresoReciente(this.userService.getToken()).subscribe(
        res => {
          if (res.datos) {
            this.eg_rec = res.datos.total
          }
        },
        err => console.log(err)
      )
      this.chartsService.getMayorProveedor(this.userService.getToken()).subscribe(
        res => {
          if (res.datos) {
            this.ma_prov_nom = res.datos.prov_nombre
            this.ma_prov_tot = res.datos.mayor
          }
        },
        err => console.log(err)
      )
      this.chartsService.getIngresosAnuales(this.userService.getToken()).subscribe(
        res => {
          if (res.datos) {
            this.ing_anual_anio = res.datos.anio
            this.ing_anual_tot = res.datos.total
          }
        },
        err => console.log(err)
      )
    }, 200);
  }

  asignar_tipo_grafico(tip_graf){
    if (tip_graf == 'Semana'){
      this.borrarGraficos()
      this.tipo_grafico = 'Semana'
      console.log('modo semanas')
    }
    else {
      this.tipo_grafico = 'Mes'
      this.getGraficosMeses()
      console.log('modo meses')
    }
  }

  borrarGraficos(){
    this.dsfac = [];
    this.dsfac2 = [];
    this.lab = [];
    this.lab2 = [];
    this.lab3 = [];
    this.lab4 = [];
    this.dat = [];
    this.dat2 = [];
    this.dsfacn = [];
    this.dsfac2n = [];
    this.labn = [];
    this.lab2n = [];
    this.lab3n = [];
    this.lab4n = [];
    this.datn = [];
    this.dat2n = [];
  }

  getGraficosMeses() {
    setTimeout(() => {
      if (this.tipo_grafico = 'Mes'){
        this.chartsService.getIngresosMensuales(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfac = res.datos;
              for (let f of this.dsfac) {
                if (f.anio == '2021') {
                  this.lab.push(f.mes)
                  this.lab2.push(f.anio)
                  this.dat.push(f.total)
                }
              }
            }
          },
          err => console.log(err)
        )
        this.chartsService.getEgresosMensuales(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfac2 = res.datos;
              for (let f2 of this.dsfac2) {
                if (f2.anio == '2021') {
                  this.lab3.push(f2.mes)
                  this.lab4.push(f2.anio)
                  this.dat2.push(f2.total)
                }
              }
              this.grafico1()
              this.grafico2()
            }
          },
          err => console.log(err)
        )
      }
    }, 200);
  }

  getGraficos2(tipo:any, anio: number) {
    this.borrarGraficos()
    if (this.myBarChart != undefined){
      borrarGraficos(this.myBarChart)
    }
    if (this.myBarChart2 != undefined){
      borrarGraficos(this.myBarChart2)
    }
    if (this.myBarChart3 != undefined){
      borrarGraficos(this.myBarChart3)
    }
    if (this.myBarChart4 != undefined){
      borrarGraficos(this.myBarChart4)
    }
    setTimeout(() => {
      if (tipo == 'Semana'){
        this.chartsService.getIngresos(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfac = res.datos;
              for (let f of this.dsfac) {
                if (f.anio == anio.toString()) {
                  this.lab.push(f.fac_semana)
                  this.lab2.push(f.anio)
                  this.dat.push(f.total)
                }
  
              }
              this.grafico1()
            }
          },
          err => console.log(err)
        )
        this.chartsService.getEgresos(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfac2 = res.datos;
              for (let f2 of this.dsfac2) {
                if (f2.anio == anio.toString()) {
                  this.lab3.push(f2.pag_semana)
                  this.lab4.push(f2.anio)
                  this.dat2.push(f2.total)
                }
              }
              this.grafico2()
            }
          },
          err => console.log(err)
        )
        
      }
      if (tipo == 'Mes'){
        this.chartsService.getIngresosMensuales(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfacn = res.datos;
              for (let f of this.dsfacn) {
                if (f.anio == anio.toString()) {
                  this.labn.push(f.mes)
                  this.lab2n.push(f.anio)
                  this.datn.push(f.total)
                }
              }
              this.grafico3()
            }
          },
          err => console.log(err)
        )
        
        this.chartsService.getEgresosMensuales(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.dsfac2n = res.datos;
              for (let f2 of this.dsfac2n) {
                if (f2.anio == anio.toString()) {
                  this.lab3n.push(f2.mes)
                  this.lab4n.push(f2.anio)
                  this.dat2n.push(f2.total)
                }
              }
              this.grafico4()
            }
          },
          err => console.log(err)
        )
      }
    }, 200);
  }

  grafico1() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.myBarChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat,
          backgroundColor: "#007bff",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: this.lab
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'index',
          intersect: true
        },
        legend: {
          display: false
        },
      }
    });
    this.borrarGraficos()
  }

  grafico2() {
    this.canvas2 = this.mychart2.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
    this.myBarChart2 =new Chart(this.ctx2, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat2,
          backgroundColor: "gray",
          borderColor: "#007ee7",
        }],
        labels: this.lab3
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'index',
          intersect: true
        },
        legend: {
          display: false
        },
      }
    });
    this.borrarGraficos()
  }

  grafico3() {
    this.canvas3 = this.mychartn.nativeElement;
    this.ctx3 = this.canvas3.getContext('2d');
    this.myBarChart3 = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.datn,
          backgroundColor: "#007bff",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: this.labn
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'index',
          intersect: true
        },
        legend: {
          display: false
        },
      }
    });
    this.borrarGraficos()
  }

  grafico4() {
    this.canvas4 = this.mychart2n.nativeElement;
    this.ctx4 = this.canvas4.getContext('2d');
    this.myBarChart4 = new Chart(this.ctx4, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat2n,
          backgroundColor: "gray",
          borderColor: "#007ee7",
        }],
        labels: this.lab3n
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'index',
          intersect: true
        },
        legend: {
          display: false
        },
      }
    });
    this.borrarGraficos()
  }
}