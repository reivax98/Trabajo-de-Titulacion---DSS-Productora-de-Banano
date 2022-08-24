export class Proveedor{
	constructor(
		public prov_id: Int32Array | null,
		public prov_nombre: string,
		public prov_ruc_cedula: string | null,
		public prov_telefono1: string | null,
		public prov_telefono2: string | null
	){}
}