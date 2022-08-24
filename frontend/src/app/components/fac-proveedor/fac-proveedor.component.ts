import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { FacProveedor } from '../../models/fac-proveedor';
import { FacProvDetalle } from '../../models/fac-prov-detalle';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-fac-proveedor',
  templateUrl: './fac-proveedor.component.html',
  styleUrls: ['./fac-proveedor.component.css'],
  providers: [TablesService, UserService]
})
export class FacProveedorComponent implements OnInit {

  public facproveedor: FacProveedor;
  public facproveedor2: FacProveedor[];
  public detalle: FacProvDetalle[];
  public detalle2: FacProvDetalle;
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public page: number;
  public det_id: any;
  public vtotal: any;
  public subt: any;
  public sum: any;
  public crud_det: boolean;
  public add_det: boolean;
  public proveedor: Proveedor[];
  public detalle_viejo: any[];
  public semanas: any[];
  public identity: any;


  constructor(
    private tablesService: TablesService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.facproveedor = new FacProveedor(null, null, null, null, "", "", "", null, null, "");
    this.facproveedor2 = [];
    this.detalle = [];
    this.detalle2 = new FacProvDetalle(null, null, null, null, null, null)
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.det_id = null;
    this.vtotal = null;
    this.subt = null;
    this.sum = null;
    this.crud_det = false;
    this.add_det = false;
    this.proveedor = [];
    this.detalle_viejo = [];
    this.semanas = [];
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    for (let i = 1; i < 54; i++) {
      this.semanas.push(i)
    }
    this.tablesService.getProveedorOrden(this.token).subscribe(
      res => {
        if (res.datos) {
          this.proveedor = res.datos;
        }
      },
      err => console.log(err)
    )
    this.tablesService.getFacProveedor(this.token).subscribe(
      res => {
        if (res.datos) {
          this.facproveedor2 = res.datos;
        }
      },
      err => console.log(err)
    )
  }

  guardarTempId(id: any) {
    this.temp_id = id
    console.log(this.temp_id)
  }

  actions(ac: string, id: Int32Array | null) {
    this.crud = true;
    if (ac == 'add') {
      this.vaciarFacProveedor();
      this.add = true;
      this.crud_det = false
    }
    else {
      this.add = false;
      this.crud_det = false
      this.tablesService.getEditFacProveedor(this.token, id).subscribe(
        res => {
          if (res) {
            this.facproveedor = res;
            console.log(this.facproveedor)
            console.log(typeof this.facproveedor)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  actionsDet(ac: string, id: Int32Array | null, det: any) {
    this.crud_det = true;
    if (ac == 'add') {
      this.vaciarFacProveedorDetalle();
      this.add_det = true;
      this.facproveedor.facprov_id = id
      this.crud = false;
    }
    else if (ac == 'edit'){
      this.crud = false;
      this.add_det = false;
      this.detalle_viejo = []
      this.facproveedor.facprov_id = id
      console.log(det)
      this.tablesService.getEditFacProveedorDetalle(this.token, det).subscribe(
        res => {
          if (res) {
            this.detalle2 = res;
            this.detalle_viejo.push(this.detalle2.facprov_id)
            this.detalle_viejo.push(this.detalle2.facprovdet_insumo)
            this.detalle_viejo.push(this.detalle2.facprovdet_servicio)
          }
          
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  borrar(ac: string, det: any) {
    console.log(det)
  }

  vaciarFacProveedor() {
    this.facproveedor.facprov_id = null;
    this.facproveedor.prov_nombre = null;
    this.facproveedor.facprov_semana = null;
    this.facproveedor.fecha = null;
    this.facproveedor.facprov_descripcion = "";
    this.facproveedor.facprov_fase = "";
    this.facproveedor.facprov_observacion = "";
    this.facproveedor.facprov_descuento = null;
    this.facproveedor.facprov_iva = null;
    this.facproveedor.facprov_status = "";
  }

  vaciarFacProveedorDetalle() {
    this.detalle2.facprov_id = null;
    this.detalle2.facprovdet_insumo = null;
    this.detalle2.facprovdet_servicio = null;
    this.detalle2.facprovdet_descripcion = null;
    this.detalle2.facprovdet_cantidad = null;
    this.detalle2.facprovdet_precio_unitario = null;
  }

  addFacProveedor(form: any) {
    this.crud = true;
    this.add = true;
    console.log(this.facproveedor)
    this.tablesService.addFacProveedor(this.token, this.facproveedor).subscribe(
      res => {
        if (res.fac){
          console.log('agregado')
          form.reset();
          this.vaciarFacProveedor();
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

  editFacProveedor(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    console.log(this.facproveedor)
    this.tablesService.editFacProveedor(id, this.facproveedor).subscribe(
      res => {
        if (res.facprov){
          console.log('editado')
          form.reset();
          this.vaciarFacProveedor();
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

  addFacProveedorDet(form: any) {
    this.crud = false
    this.crud_det = true;
    this.add_det = true;
    this.detalle2.facprov_id = this.facproveedor.facprov_id;
    console.log(this.detalle2)
    this.tablesService.addFacProveedorDetalle(this.token, this.detalle2).subscribe(
      res => {
        if (res.fac){
          console.log('agregado')
          form.reset();
          this.vaciarFacProveedorDetalle();
          this.crud_det = false;
          this.ngOnInit();
        }
        else{
          console.log('error')
          alert(res.message)
        }
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editFacProveedorDet(form: any, id: Int32Array | null) {
    this.add_det = false;
    
    console.log(this.detalle_viejo)
    console.log(this.detalle2)
    this.tablesService.editFacProveedorDetalle(id, this.detalle_viejo, this.detalle2).subscribe(
      res => {
        if (res.facprov){
          console.log('editado')
          form.reset();
          this.vaciarFacProveedorDetalle();
          this.crud_det = false;
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

  async deleteFacProveedor(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteFacProveedor(this.token, id).subscribe(
        res => {
          if (res.facprov){
            console.log('borrado')
            console.log(res)
            this.temp_id = null;
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
    } else {
      console.log('Debe verificar')
    }
  }

  detalleFacProv(id: Int32Array | null) {
    this.vtotal = 0
    console.log(this.detalle2)
    
    this.detalle = []
    this.tablesService.getDetFacProveedor(this.token, id).subscribe(
      res => {
        if (res.datos) {
          if (res.datos.length != 0){
            this.detalle = res.datos;
            this.total2(this.detalle, this.detalle);
          }
          console.log(this.detalle)
          console.log(this.detalle2)
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


  total(detalle, detalle2){
    detalle.forEach((element) => {
      this.subt = (Number(element.facprovdet_cantidad) * Number(element.facprovdet_precio_unitario))
      this.sum = Number(this.sum) + Number(this.subt)
    });
    this.vtotal = ((parseFloat(this.sum) - parseFloat(detalle2[0].facprov_descuento)) + parseFloat(detalle2[0].facprov_iva)).toFixed(2)
    this.sum = 0
    this.vaciarFacProveedorDetalle();
  }

  total2(detalle, detalle2){
    detalle.forEach((element) => {
      this.subt = (Number(element.facprovdet_cantidad) * Number(element.facprovdet_precio_unitario))
      this.sum = Number(this.sum) + Number(this.subt)
    });
    this.vtotal = ((parseFloat(this.sum) - parseFloat(detalle2[0].facprov_descuento)) + parseFloat(detalle2[0].facprov_iva)).toFixed(2)
    this.sum = 0
    this.vaciarFacProveedorDetalle();
  }


  async deleteFacProveedorDetalle(det: any) {
    console.log(det)
    if (det != null) {
      this.tablesService.deleteFacProveedorDetalle(this.token, det).subscribe(
        res => {
          console.log('detalle borrado')
          console.log(res)
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
}
