export class User{
	constructor(
		public us_id: Int32Array | null,
		public us_nombres: string | null,
		public us_apellidos: string | null,
		public us_correo: string | null,
		public us_telefono: string | null,
		public us_genero: string | null,
		public us_rol: string | null,
		public us_clave: string | null,
	){}
}