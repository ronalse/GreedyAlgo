class Entrenador {
    constructor(
        public nombre: string,
        public reputacion: number,  // Reputación entre 0 y 5
        public plazasDisponibles: number // Número de clientes que puede aceptar
    ) {}
}

class Cliente {
    constructor(
        public nombre: string,
        public importanciaReputacion: number // Importancia que le da a la reputación, entre 0 y 10
    ) {}
}

// Función para calcular la satisfacción entre cliente y entrenador
function calcularSatisfaccion(cliente: Cliente, entrenador: Entrenador): number {
    return cliente.importanciaReputacion * entrenador.reputacion;
}

// Crear una lista de combinaciones entre entrenadores y clientes
type Combinacion = {
    entrenador: Entrenador;
    cliente: Cliente;
    satisfaccion: number;
};

function generarCombinaciones(entrenadores: Entrenador[], clientes: Cliente[]): Combinacion[] {
    const combinaciones: Combinacion[] = [];

    // Recorrer todos los clientes y entrenadores para generar combinaciones
    for (const cliente of clientes) {
        for (const entrenador of entrenadores) {
            // Calcular la satisfacción para cada combinación
            const satisfaccion = calcularSatisfaccion(cliente, entrenador);
            combinaciones.push({ entrenador, cliente, satisfaccion });
        }
    }

    return combinaciones;
}

// Ordenar las combinaciones por satisfacción en orden descendente
function ordenarCombinaciones(combinaciones: Combinacion[]): Combinacion[] {
    return combinaciones.sort((a, b) => b.satisfaccion - a.satisfaccion);
}

// Función para asignar clientes a entrenadores
function asignarClientes(entrenadores: Entrenador[], clientes: Cliente[]): void {
    const combinaciones = generarCombinaciones(entrenadores, clientes);
    const combinacionesOrdenadas = ordenarCombinaciones(combinaciones);
    
    // Crear un mapa para almacenar las asignaciones finales
    const asignaciones: { [key: string]: string[] } = {};

    // Crear un Set para llevar un seguimiento de los clientes asignados
    const clientesAsignados = new Set<string>();

    // Inicializar el mapa de asignaciones para cada entrenador
    for (const entrenador of entrenadores) {
        asignaciones[entrenador.nombre] = [];
    }

    // Asignar clientes respetando las plazas disponibles y evitando asignar dos veces el mismo cliente
    for (const combinacion of combinacionesOrdenadas) {
        const { entrenador, cliente } = combinacion;

        // Verificar si el cliente ya ha sido asignado o si el entrenador tiene plazas disponibles
        if (!clientesAsignados.has(cliente.nombre) && entrenador.plazasDisponibles > 0) {
            // Asignar el cliente al entrenador
            asignaciones[entrenador.nombre].push(cliente.nombre);

            // Reducir las plazas disponibles del entrenador
            entrenador.plazasDisponibles -= 1;

            // Marcar al cliente como asignado
            clientesAsignados.add(cliente.nombre);
        }
    }

    // Mostrar el resultado final de las asignaciones
    console.log("Asignaciones finales:");
    for (const entrenador in asignaciones) {
        console.log(`Entrenador ${entrenador}: ${asignaciones[entrenador].join(", ")}`);
    }
}

// Lista de entrenadores
const entrenadores: Entrenador[] = [
    new Entrenador('A', 4.5, 1),
    new Entrenador('B', 3.2, 4),
    new Entrenador('C', 1.2, 3),
    new Entrenador('D', 3.4, 2),
];

// Lista de clientes
const clientes: Cliente[] = [
    new Cliente('q', 2.6),
    new Cliente('r', 3.7),
    new Cliente('s', 8.5),
    new Cliente('t', 9.7),
    new Cliente('u', 2.6),
    new Cliente('v', 4.7),
    new Cliente('w', 5.6),
    new Cliente('x', 3.7),
    new Cliente('y', 8.1),
    new Cliente('z', 2.5),
];

// Ejecutar la función para realizar la asignación
asignarClientes(entrenadores, clientes);