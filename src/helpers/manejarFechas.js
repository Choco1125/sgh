export default function manejarFecha(fecha) {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
}