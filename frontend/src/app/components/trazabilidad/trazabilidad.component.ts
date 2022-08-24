import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChartsService } from '../../services/charts.service';
import { Chart } from 'chart.js';
import { TzSiembra } from '../../models/tz-siembra';
import { TzCuidado } from '../../models/tz-cuidado';
import { TzCosecha } from '../../models/tz-cosecha';

function borrarGraficos(grafico) {
  grafico.data.datasets = [] //Desired Data
  grafico.update();
}

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css'],
  providers: [ChartsService, UserService]
})

export class TrazabilidadComponent implements OnInit {


  public token: any;
  public tzsie: TzSiembra[];
  public tzcui: TzCuidado[];
  public tzcos: TzCosecha[];
  public lab: any[];
  public lab2: any[];
  public lab3: any[];
  public dat: any[];
  public dat2: any[];
  public dat3: any[];

  public canvas: any;
  public ctx: any;
  public canvas2: any;
  public ctx2: any;
  public canvas3: any;
  public ctx3: any;

  public tipo_grafico: any;
  public anio: number;
  public myBarChart: any;
  public myBarChart2: any;
  public myBarChart3: any;
  @ViewChild('siembrachart') siembrachart: any;
  @ViewChild('cuidadochart') cuidadochart: any;
  @ViewChild('cosechachart') cosechachart: any;


  constructor(
    private chartsService: ChartsService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.tzsie = [];
    this.tzcui = [];
    this.tzcos = [];
    this.lab = [];
    this.lab2 = [];
    this.lab3 = [];
    this.dat = [];
    this.dat2 = [];
    this.dat3 = [];
    this.tipo_grafico = 'Semana';
    this.anio = 2022;
  }

  ngOnInit(): void {
    this.getPrueba(this.tipo_grafico, this.anio)
  }

  borrarGraficos(){
    this.tzsie = [];
    this.tzcui = [];
    this.tzcos = [];
    this.lab = [];
    this.lab2 = [];
    this.lab3 = [];
    this.dat = [];
    this.dat2 = [];
    this.dat3 = [];
  }

  getPrueba(tipo: any, anio: number) {
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
    setTimeout(() => {
      if (tipo == 'Semana') {
        this.chartsService.getSiembra(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzsie = res.datos;
              for (let t of this.tzsie) {
                if (t.anio == anio.toString()) {
                  this.lab.push(t.facprov_semana)
                  this.dat.push(t.sum)
                }

              }
              this.grafico1()
            }
          },
          err => console.log(err)
        )
        this.chartsService.getCuidado(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzcui = res.datos;
              for (let t2 of this.tzcui) {
                if (t2.anio == anio.toString()) {
                  this.lab2.push(t2.facprov_semana)
                  this.dat2.push(t2.sum)
                }

              }
              this.grafico2()
            }
          },
          err => console.log(err)
        )
        this.chartsService.getCosecha(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzcos = res.datos;        
              for (let t3 of this.tzcos) {
                if (t3.anio == anio.toString()) {
                  this.lab3.push(t3.pag_semana)
                  this.dat3.push(t3.total)
                }

              }
              this.grafico3()
            }
          },
          err => console.log(err)
        )
      }
      if (tipo == 'Mes') {
        this.chartsService.getSiembraMes(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzsie = res.datos;
              for (let t of this.tzsie) {
                if (t.anio == anio.toString()) {
                  this.lab.push(t.mes)
                  this.dat.push(t.sum)
                }

              }
              this.grafico1()
            }
          },
          err => console.log(err)
        )
        this.chartsService.getCuidadoMes(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzcui = res.datos;
              for (let t2 of this.tzcui) {
                if (t2.anio == anio.toString()) {
                  this.lab2.push(t2.mes)
                  this.dat2.push(t2.sum)
                }

              }
              this.grafico2()
            }
          },
          err => console.log(err)
        )
        this.chartsService.getCosechaMes(this.userService.getToken()).subscribe(
          res => {
            if (res.datos) {
              this.tzcos = res.datos;           
              for (let t3 of this.tzcos) {
                if (t3.anio == anio.toString()) {
                  this.lab3.push(t3.mes)
                  this.dat3.push(t3.total)
                }

              }
              this.grafico3()
            }
          },
          err => console.log(err)
        )
      }
    }, 200);
  }

  grafico1() {
    this.canvas = this.siembrachart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.myBarChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat,
          backgroundColor: "#9acd32",
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
    this.canvas2 = this.cuidadochart.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
    this.myBarChart2 = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat2,
          backgroundColor: "#008f39",
          borderColor: "#007ee7",
        }],
        labels: this.lab2
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
    this.canvas3 = this.cosechachart.nativeElement;
    this.ctx3 = this.canvas3.getContext('2d');
    this.myBarChart3 = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dat3,
          backgroundColor: "#003300",
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
}
