import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Facturacion } from '../../models/facturacion';
import { FacDetalle } from '../../models/fac-detalle';
import { Exportadora } from '../../models/exportadora';
import { Hacienda } from '../../models/hacienda';
import { TipoCaja } from '../../models/tipo-caja';
import { Marca } from '../../models/marca';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  providers: [TablesService, UserService, DatePipe]
})
export class FacturacionComponent implements OnInit {

  public facturacion: Facturacion;
  public facturacion2: Facturacion[];
  public detalle: FacDetalle[];
  public detalle2: FacDetalle;
  public detalle3: FacDetalle;
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public page: number;
  public det_id: any;
  public vtotal: any;
  public nuevafecha: any;
  public crud_det: boolean;
  public add_det: boolean;
  public exportadora: Exportadora[];
  public hacienda: Hacienda[];
  public tipocaja: TipoCaja[];
  public marca: Marca[];
  public semanas: any[];

  constructor(
    private tablesService: TablesService,
    private userService: UserService,
    public datepipe: DatePipe
  ) {
    this.token = this.userService.getToken();
    this.facturacion = new Facturacion(null, null, null, null, null, null, null);
    this.facturacion2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.detalle = [];
    this.detalle2 = new FacDetalle(null, null, null, null, null, null, null)
    this.detalle3 = new FacDetalle(null, null, null, null, null, null, null)
    this.det_id = null;
    this.vtotal = null;
    this.nuevafecha = null;
    this.crud_det = false;
    this.add_det = false;
    this.exportadora = [];
    this.hacienda = [];
    this.tipocaja = [];
    this.marca = [];
    this.semanas = [];
  }

  ngOnInit(): void {
    for (let i = 1; i < 54; i++) {
      this.semanas.push(i)
    }
    this.tablesService.getHacienda(this.token).subscribe(
      res => {
        if (res.datos) {
          this.hacienda = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getTipoCaja(this.token).subscribe(
      res => {
        if (res.datos) {
          this.tipocaja = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getMarca(this.token).subscribe(
      res => {
        if (res.datos) {
          this.marca = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getExportadora(this.token).subscribe(
      res => {
        if (res.datos) {
          this.exportadora = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getFacturacion(this.token).subscribe(
      res => {
        if (res.datos) {
          this.facturacion2 = res.datos;
        }
      },
      err => console.log(err)
    )
  }

  guardarTempId(id: any) {
    this.temp_id = id
    console.log(this.temp_id)
  }

  mostrarFecha(fecha: any) {
    this.nuevafecha =this.datepipe.transform(fecha, 'yyyy-MM-dd');
    console.log(this.nuevafecha)
  }

  getIdExp(){
    console.log(this.facturacion)
    console.log(this.exportadora)
    console.log(this.facturacion.exp_nombre)
  }

  actions(ac: string, id: Int32Array | null) {
    this.crud = true;
    if (ac == 'add') {
      this.vaciarFacturacion();
      this.add = true;
      this.crud_det = false
    }
    else {
      this.add = false;
      this.crud_det = false;
      this.tablesService.getEditFacturacion(this.token, id).subscribe(
        res => {
          if (res) {
            this.facturacion = res;
            console.log(this.facturacion)
            console.log(this.facturacion.fecha)
            console.log(typeof this.facturacion)
          }
          this.mostrarFecha(this.facturacion.fecha)
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  actionsDet(ac: string, id: Int32Array | null) {
    this.crud_det = true;
    if (ac == 'add') {
      this.vaciarDetalle();
      this.add_det = true;
      this.facturacion.fac_id = id
      this.crud = false;
    }
    else {
      this.crud = false;
      this.add_det = false;
      console.log(id)
      this.facturacion.fac_id = id
      this.tablesService.getDetEditFacturacion(this.token, id).subscribe(
        res => {
          if (res) {
            this.detalle3 = res;
            console.log(this.detalle3)
            console.log(typeof this.detalle3)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarFacturacion() {
    this.facturacion.fac_id = null;
    this.facturacion.exp_id = null;
    this.facturacion.exp_nombre = null;
    this.facturacion.fac_semana = null;
    this.facturacion.fecha = null;
    this.facturacion.fac_descuento = null;
    this.facturacion.fac_estado = null;
  }

  vaciarDetalle() {
    this.detalle3.fac_id = null;
    this.detalle3.facdet_cod_prog = null;
    this.detalle3.hac_nombre = null;
    this.detalle3.tipcaj_nombre = null;
    this.detalle3.mar_nombre = null;
    this.detalle3.facdet_cantidad = null;
    this.detalle3.facdet_precio_unitario = null;
  }

  addDetalleFacturacion(form: any, id: Int32Array | null) {
    this.crud_det = true;
    this.add_det = true;
    this.detalle3.fac_id = this.facturacion.fac_id;
    console.log(this.detalle3)
    this.tablesService.addDetFacturacion(this.token, this.detalle3).subscribe(
      res => {
        if (res.det){
          console.log('detalle agregado')
          form.reset();
          this.vaciarDetalle();
          this.crud_det = false;
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

  editDetalleFacturacion(form: any, id: Int32Array | null) {
    this.crud_det = true;
    this.add_det = false;
    this.tablesService.editDetFacturacion(id, this.detalle3).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarDetalle();
        this.crud_det = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  addFacturacion(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addFacturacion(this.token, this.facturacion).subscribe(
      res => {
        if (res.fac){
          console.log('agregado')
          form.reset();
          this.vaciarFacturacion();
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

  editFacturacion(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    console.log(this.facturacion)
    this.tablesService.editFacturacion(id, this.facturacion).subscribe(
      res => {
        if (res.edit){
          console.log('editado')
          form.reset();
          this.vaciarFacturacion();
          this.crud = false;
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

  async deleteFacturacion(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteFacturacion(this.token, id).subscribe(
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

  guardarDetId(id: any) {
    this.det_id = id
    console.log(this.det_id)
  }

  detalleFac(id: Int32Array | null) {
    this.vtotal = 0
    this.detalle = []
    this.det_id = id
    this.tablesService.getDetFacturacion(this.token, id).subscribe(
      res => {
        if (res.datos) {
          console.log(res.datos)
          this.detalle = res.datos;
          this.detalle2 = res.datos;
          this.vtotal = ((this.detalle2[0].facdet_cantidad * this.detalle2[0].facdet_precio_unitario)-this.detalle2[0].fac_descuento).toFixed(2)
        }
        else {
          this.detalle2 = null
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  createPDF(id: Int32Array | null) {
    console.log(id)
    this.detalleFac(id);
    setTimeout(() => {
      if (this.detalle2 == null){
        alert('Debe ingresar detalles para poder generar un reporte')
      }
      else{
        setTimeout(() => {
          const pdfDefinition: any = {
            content: [
              {
                text: 'AGRICOLA TIERRA PROMETIDA',
                style: 'header',
                alignment: 'center',
              },
              { text: 'PRODUCTOR BANANERO', style: 'subheader', alignment: 'center' },
              { text: ' ', style: 'subheader'},
              'IBAÑEZ GOMEZ FRANCISCO JAMES',
              'Dirección Matriz: Junin 417 e/. Marcel Laniado y Kleber Franco',
              'Correo: franciscoibanezmachala@gmail.com',
              'RUC: 0700262827001',
              { text: ' ', style: 'subheader'},
              'FACTURA COD: ' + this.detalle2[0].fac_id,
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      'Nombre de Exportadora: '+ this.detalle2[0].exp_nombre +'\nDirección: ' + this.detalle2[0].exp_direccion +'\nRUC: ' + this.detalle2[0].exp_ruc +'                                                                              Fecha Emisión:  ' + this.detalle2[0].fac_fecha,
                    ],
                  ]
                }
              },
              {
                table: {
                  widths: ['*','*','*','*','*','*','*'],
                  body: [
                    [
                      'Código',
                      'Descripción',
                      'Marca',
                      'Tipo de caja',
                      'Cantidad',
                      'Precio Unitario',
                      'Total'
                    ],
                    [
                      this.detalle2[0].facdet_cod_prog,
                      'CAJAS DE BANANO',
                      this.detalle2[0].mar_nombre,
                      this.detalle2[0].tipcaj_nombre,
                      this.detalle2[0].facdet_cantidad,
                      this.detalle2[0].facdet_precio_unitario,
                      (this.detalle2[0].facdet_cantidad * this.detalle2[0].facdet_precio_unitario).toFixed(2),
                    ],
                    [{colSpan: 5, rowSpan: 3, text: 'Hacienda: '+ this.detalle2[0].hac_nombre},{},{},{},{},'Subtotal: ',(this.detalle2[0].facdet_cantidad * this.detalle2[0].facdet_precio_unitario).toFixed(2)],
                    ['','','','','','Descuento: ', (this.detalle2[0].fac_descuento*1).toFixed(2)],
                    ['','','','','','Valor Total: ',((this.detalle2[0].facdet_cantidad * this.detalle2[0].facdet_precio_unitario)-this.detalle2[0].fac_descuento).toFixed(2)],
                  ]
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
    }, 200);
  }

}
