// Definir interfaces para Entrenador y Cliente
interface Entrenador {
    nombre: string;
    reputacion: number;
    plazasDisponibles: number;
}

interface Cliente {
    nombre: string;
    importanciaReputacion: number;
}

// Crear instancias de entrenadores y clientes
let entrenadores: Entrenador[] = [
    {nombre: 'A', reputacion: 4.5, plazasDisponibles: 1},
    {nombre: 'B', reputacion: 3.2, plazasDisponibles: 4},
    {nombre: 'C', reputacion: 1.2, plazasDisponibles: 3},
    {nombre: 'D', reputacion: 3.4, plazasDisponibles: 2}
];

let clientes: Cliente[] = [
    {nombre: 'q', importanciaReputacion: 2.6},
    {nombre: 'r', importanciaReputacion: 3.7},
    {nombre: 's', importanciaReputacion: 8.5},
    {nombre: 't', importanciaReputacion: 9.7},
    {nombre: 'u', importanciaReputacion: 2.6},
    {nombre: 'v', importanciaReputacion: 4.7},
    {nombre: 'w', importanciaReputacion: 5.6},
    {nombre: 'x', importanciaReputacion: 3.7},
    {nombre: 'y', importanciaReputacion: 8.1},
    {nombre: 'z', importanciaReputacion: 2.5}
];

// Función para asignar clientes a entrenadores
export function asignarClientes(): Map<Cliente, {entrenador: Entrenador, plazasIniciales: number}> {
    const asignacion: Map<Cliente, {entrenador: Entrenador, plazasIniciales: number}> = new Map();

    // Ordenar clientes por importancia de la reputación en orden descendente
    clientes.sort((a, b) => b.importanciaReputacion - a.importanciaReputacion);

    // Asignar clientes a entrenadores
    for (const cliente of clientes) {
        // Ordenar entrenadores por reputación en orden descendente y por plazas disponibles en orden ascendente
        entrenadores.sort((a, b) => b.reputacion - a.reputacion || a.plazasDisponibles - b.plazasDisponibles);

        for (const entrenador of entrenadores) {
            if (entrenador.plazasDisponibles > 0) {
                // Guardamos las plazas iniciales antes de restarlas
                const plazasIniciales = entrenador.plazasDisponibles;
                asignacion.set(cliente, {entrenador, plazasIniciales});
                
                // Reducimos las plazas disponibles
                entrenador.plazasDisponibles--;
                
                break; // Salir del bucle de entrenadores una vez que el cliente ha sido asignado
            }
        }
    }

    return asignacion;
}

export {Cliente, Entrenador}
// Función para mostrar la asignación de manera legible
function mostrarAsignacion(asignacion: Map<Cliente, {entrenador: Entrenador, plazasIniciales: number}>) {
    console.log('Asignación final:');
    asignacion.forEach(({entrenador, plazasIniciales}, cliente) => {
        const plazasRestantes = plazasIniciales - 1; // Calculamos las plazas restantes
        console.log(`Cliente ${cliente.nombre} asignado a Entrenador ${entrenador.nombre} (Reputación: ${entrenador.reputacion}, Plazas disponibles restantes: ${plazasRestantes})`);
    });
}

// Ejecutar la asignación de clientes y mostrar los resultados
let asignacionFinal = asignarClientes();
mostrarAsignacion(asignacionFinal);
