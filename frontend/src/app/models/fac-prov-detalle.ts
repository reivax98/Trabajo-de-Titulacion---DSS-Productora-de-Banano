export class FacProvDetalle{
	constructor(
		public facprov_id: Int32Array | null,
		public facprovdet_insumo: string | null,
		public facprovdet_servicio: string | null,
		public facprovdet_descripcion: string | null,
		public facprovdet_cantidad: Int32Array | null,
		public facprovdet_precio_unitario: Float32Array | null
	){}
}