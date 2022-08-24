import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Pago } from '../../models/pago';
import { Empleado } from '../../models/empleado';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [TablesService, UserService]
})
export class PagoComponent implements OnInit {

  public pago: Pago;
  public pago2: Pago[];
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public page: number;
  public semanas: any;
  public anios: any;
  public reporte: any;
  public sem: any;
  public an: any;
  public rep: boolean;
  public empleado: Empleado[];
  public num_semanas: any[];
  public identity: any;

  constructor(
    private tablesService: TablesService,
    private userService: UserService 
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.pago = new Pago(null, null, null, "", "", null);
    this.pago2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.semanas = null;
    this.anios = null;
    this.reporte = null;
    this.sem = null;
    this.an = null;
    this.rep = false;
    this.empleado = [];
    this.num_semanas = [];
  }

  ngOnInit(): void {
    for (let i = 1; i < 54; i++) {
      this.num_semanas.push(i)
    }
    this.tablesService.getEmpleadoOrden(this.token).subscribe(
      res => {
        if (res.datos) {
          this.empleado = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getPago(this.token).subscribe(
      res => {
        if (res.datos) {
          this.pago2 = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getPagoAnio(this.token).subscribe(
      res => {
        if (res.datos) {
          this.anios = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getPagoSemana(this.token).subscribe(
      res => {
        if (res.datos) {
          this.semanas = res.datos;
        }
      },
      err => console.log(err)
    )

  }

  guardarTempId(id: any) {
    this.temp_id = id
    console.log(this.temp_id)
  }

  cerrarInterfaces(){
    this.rep = true;
    this.crud = false;
  }

  actions(ac: string, id: Int32Array | null) {
    this.crud = true;
    this.rep = false
    if (ac == 'add') {
      this.vaciarPago();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditPago(this.token, id).subscribe(
        res => {
          if (res) {
            this.pago = res;
            console.log(this.pago)
            console.log(typeof this.pago)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarPago() {
    this.pago.pag_id = null;
    this.pago.pag_semana = null;
    this.pago.fecha = null;
    this.pago.pag_tipo = "";
    this.pago.emp_nombre_completo = "";
    this.pago.pag_monto = null;
  }

  addPago(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addPago(this.token, this.pago).subscribe(
      res => {
        if (res.pago){
          console.log('agregado')
          form.reset();
          this.vaciarPago();
          this.ngOnInit();
        }
        else{
          alert(res.message)
        }
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editPago(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editPago(id, this.pago).subscribe(
      res => {
        if (res.pago){
          console.log('editado')
          form.reset();
          this.vaciarPago();
          this.crud = false;
          this.ngOnInit();
        }
        else {
          alert(res.message)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deletePago(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deletePago(this.token, id).subscribe(
        res => {
          console.log('borrado')
          console.log(res)
          this.temp_id = null;
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      console.log('Debe verificar')
    }
  }

  createPDF(semana: number | null, anio: number | null) {
    this.crud = false;
    this.tablesService.getPagoReporte(this.token, semana, anio).subscribe(
      res => {
        if (res.datos) {
          this.reporte = res.datos;
        }
      },
      err => console.log(err)
    )
    setTimeout(() => {
      var rows = [];
      var subt: number = 0;
      rows.push(['Código', 'Semana', 'Fecha', 'Tipo', 'Nombre completo', 'Monto']);
      console.log( Object.keys(this.reporte).length)
      for (let i=0; i<Object.keys(this.reporte).length; i++) {
        rows.push([this.reporte[i].pag_id, this.reporte[i].pag_semana, this.reporte[i].fecha, this.reporte[i].pag_tipo, this.reporte[i].emp_nombre_completo, this.reporte[i].pag_monto]);
        subt = subt + parseFloat(this.reporte[i].pag_monto);
      }
      rows.push(['', '', '', '', 'TOTAL: ', subt.toFixed(2)]);
      console.log(subt)


      const pdfDefinition: any = {
        content: [
          {
            text: 'AGRICOLA TIERRA PROMETIDA',
            style: 'header',
            alignment: 'center',
          },
          { text: 'PRODUCTOR BANANERO', style: 'subheader', alignment: 'center' },
          { text: ' ', style: 'subheader' },
          'PERÍODO: ' + anio,
          { text: ' ', style: 'subheader' },
          { text: 'REPORTE DE PAGOS - SEMANA ' + semana, style: 'subheader', alignment: 'center' },
          { text: ' ', style: 'subheader' },
          {
            table: {
              widths: ['*', '*', '*', '*', '*', '*'],
              body: rows
              
            }
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
        }
      }
      
      const pdf = pdfMake.createPdf(pdfDefinition);

      pdf.open();
    }, 200);
  }

}
