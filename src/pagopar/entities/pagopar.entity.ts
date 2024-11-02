export interface PagoParComprador {
    ruc: string;
    email: string;
    ciudad: string | null;
    nombre: string;
    telefono: string;
    direccion: string;
    documento: string;
    coordenadas: string;
    razon_social: string;
    tipo_documento: string;
    direccion_referencia: string | null;
  }
  
  export interface PagoParItem {
    ciudad: string;
    nombre: string;
    cantidad: number;
    categoria: string;
    public_key: string;
    url_imagen: string;
    descripcion: string;
    id_producto: number;
    precio_total: number;
    vendedor_telefono: string;
    vendedor_direccion: string;
    vendedor_direccion_referencia: string;
    vendedor_direccion_coordenadas: string;
  }
  
  export interface PagoParOrder {
    token: string;
    comprador: PagoParComprador;
    public_key: string;
    monto_total: number;
    tipo_pedido: string;
    compras_items: PagoParItem[];
    fecha_maxima_pago: string;
    id_pedido_comercio: string;
    descripcion_resumen: string;
    forma_pago: number;
  }
  
  export interface PagoParResponse {
    respuesta: boolean;
    resultado: {
      data: string;
      pedido: string;
    }[];
  }