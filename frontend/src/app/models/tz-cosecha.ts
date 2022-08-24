export class TzCosecha {
	constructor(
		public pag_semana: Int32Array | null,
		public mes: string | null,
		public anio: string,
		public total: Float32Array | null
	) { }
}