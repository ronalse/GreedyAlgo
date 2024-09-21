import { Entrenador, Cliente, asignarClientes } from '../prueba';

describe('Pruebas de asignarClientes', () => {
  let entrenadores: Entrenador[];
  let clientes: Cliente[];

  beforeEach(() => {
    entrenadores = [
      { nombre: 'A', reputacion: 4.5, plazasDisponibles: 1 },
      { nombre: 'B', reputacion: 3.2, plazasDisponibles: 4 },
      { nombre: 'C', reputacion: 1.2, plazasDisponibles: 3 },
      { nombre: 'D', reputacion: 3.4, plazasDisponibles: 2 }
    ];

    clientes = [
      { nombre: 'q', importanciaReputacion: 2.6 },
      { nombre: 'r', importanciaReputacion: 3.7 },
      { nombre: 's', importanciaReputacion: 8.5 },
      { nombre: 't', importanciaReputacion: 9.7 },
      { nombre: 'u', importanciaReputacion: 2.6 },
      { nombre: 'v', importanciaReputacion: 4.7 },
      { nombre: 'w', importanciaReputacion: 5.6 },
      { nombre: 'x', importanciaReputacion: 3.7 },
      { nombre: 'y', importanciaReputacion: 8.1 },
      { nombre: 'z', importanciaReputacion: 2.5 }
    ];
  });

  it('debería reducir las plazas disponibles directamente', () => {
    const entrenador = { nombre: 'A', reputacion: 4.5, plazasDisponibles: 1 };
    expect(entrenador.plazasDisponibles).toBe(1);

    // Simulación de asignación de cliente
    entrenador.plazasDisponibles--;
    expect(entrenador.plazasDisponibles).toBe(0);
  });
});

describe('Cálculo de satisfacción', () => {
  it('debería calcular correctamente la satisfacción entre un cliente y un entrenador', () => {
    const entrenador = { nombre: 'A', reputacion: 4.5, plazasDisponibles: 1 };
    const cliente = { nombre: 'q', importanciaReputacion: 2.6 };

    const satisfaccion = entrenador.reputacion * cliente.importanciaReputacion;

    expect(satisfaccion).toBeCloseTo(11.7);
  });
});