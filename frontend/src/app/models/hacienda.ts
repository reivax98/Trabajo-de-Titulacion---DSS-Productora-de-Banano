export class Hacienda{
	constructor(
		public hac_id: Int32Array | null,
		public hac_nombre: string,
		public hac_hectareas: Float32Array | null,
		public hac_localidad: string | null,
		public hac_sector: string | null,
		public hac_provincia: string | null
	){}
}