export class Facturacion{
	constructor(
		public fac_id: Int32Array | null,
		public exp_id: Int32Array | null,
		public exp_nombre: string | null,
		public fac_semana: Int32Array | null,
		public fecha: Date | null,
		public fac_descuento: Float32Array | null,
		public fac_estado: string | null,
	){}
}