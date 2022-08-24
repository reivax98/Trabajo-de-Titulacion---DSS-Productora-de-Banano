export class FacDetalle{
	constructor(
		public fac_id: Int32Array | null,
		public facdet_cod_prog:  Int32Array | null,
		public hac_nombre:  Int32Array | null,
		public tipcaj_nombre: string | null,
		public mar_nombre: string | null,
		public facdet_cantidad: Int32Array | null,
		public facdet_precio_unitario: Float32Array | null
	){}
}