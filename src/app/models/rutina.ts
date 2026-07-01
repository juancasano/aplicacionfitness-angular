export interface Rutina {
  id: number;
  duracion: string;
  completada: boolean;
  idCategoria: number;
  idEjercicio: number;
  favorita?: boolean;
  diaria?: boolean;
  created_at?: string | Date;
}
