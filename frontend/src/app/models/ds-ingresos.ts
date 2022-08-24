export class DsIngresos{
	constructor(
		public fac_semana: Int32Array | null,
		public mes: string | null,
		public anio: string,
        public total: Float32Array | null
	){}
}