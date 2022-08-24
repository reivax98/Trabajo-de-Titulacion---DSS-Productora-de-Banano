export class TzSiembra{
	constructor(
		public facprov_semana: Int32Array | null,
		public mes: string | null,
		public anio: string,
    public sum: Float32Array | null
	){}
}