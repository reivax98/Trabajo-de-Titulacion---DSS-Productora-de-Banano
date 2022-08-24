export class Exportadora{
	constructor(
		public exp_id: Int32Array | null,
		public exp_nombre: string,
		public exp_descripcion: string | null,
		public exp_ruc: string | null,
		public exp_direccion: string | null,
		public exp_telefono1: string | null,
		public exp_telefono2: string | null
	){}
}