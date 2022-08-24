export class Pago{
	constructor(
		public pag_id: Int32Array | null,
		public pag_semana: Int32Array | null,
		public fecha: Date | null,
		public pag_tipo: string,
		public emp_nombre_completo: string | null,
		public pag_monto: Float32Array | null
	){}
}