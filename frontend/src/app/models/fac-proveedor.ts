export class FacProveedor{
	constructor(
		public facprov_id: Int32Array | null,
		public prov_nombre: string | null,
		public facprov_semana: Int32Array | null,
		public fecha: Date | null,
		public facprov_descripcion: string | null,
		public facprov_fase: string,
		public facprov_observacion: string | null,
		public facprov_descuento: Float32Array | null,
		public facprov_iva: Float32Array | null,
		public facprov_status: string
	){}
}