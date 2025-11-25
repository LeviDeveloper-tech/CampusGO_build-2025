// Mock data simulando o que o backend retornava

export const admins = [
  { id: 1, username: "admin", nome: "Administrador Master", senha: "admin123" },
  { id: 2, username: "prof_joao", nome: "Professor João", senha: "senha123" },
];

export const students = [
  { matricula: "1-2024233319", name: "Francisca Camilly Gomes de Oliveira" },
  { matricula: "40028922", name: "Yudi Japonês" },
  { matricula: "1-2024000001", name: "João Silva Santos" },
  { matricula: "1-2024000002", name: "Maria Oliveira Costa" },
];

export const aulas = [
  {
    id: 1,
    disciplina: "Programação Web",
    horário: "08:00-09:40",
    sala: "Laboratório 1",
    sala_id: "n3",
    data: "2025-10-27",
    dia_semana: "Segunda-feira",
    matriculas: ["1-2024233319", "1-2024000002", "40028922"], // <- array de alunos
  },
  {
    id: 2,
    disciplina: "Redes de Computadores",
    horário: "10:00-11:40",
    sala: "Laboratório de Redes",
    sala_id: "n4",
    data: "2025-10-28",
    dia_semana: "Terça-feira",
    matriculas: ["1-2024000001", "40028922"], // <- outro aluno
  },
];


export const mapData = {
  nodes: {
    n0: { id: "n0", name: "Você está aqui", x: 145, y: 290 },
    n1: { id: "n1", name: "Entrada Principal", x: 60, y: 360 },
    n2: { id: "n2", name: "Elevadores", x: 180, y: 140 },
    n3: { id: "n3", name: "Banheiros", x: 315, y: 125 },
    n4: { id: "n4", name: "Salão Nobre", x: 155, y: 540 },
    n5: { id: "n5", name: "Biblioteca", x: 400, y: 140},
    n6: { id: "n6", name: "Cantina", x: 515, y: 510 },
    n7: { id: "n7", name: "Praça de Alimentação 'A'", x: 170, y: 690 },
    n8: { id: "n8", name: "Espaço Social", x: 370, y: 550 },
    n9: { id: "n9", name: "Bloco B", x: 755, y: 370 },
    n10: { id: "n10", name: "Igreja Bom Pastor", x: 435, y: 680 },
  },
  edges: [
    { from: "n0", to: "n1", w: 150 },
    { from: "n2", to: "n3", w: 130 },
    { from: "n2", to: "n4", w: 130 },
    { from: "n2", to: "n5", w: 300 },
    { from: "n5", to: "n6", w: 200 },
  ],
};

// Algoritmo de Dijkstra para calcular rota
export function calculateRoute(nodes, edges, origin, destination) {
  const distances = {};
  const previous = {};
  const unvisited = new Set();

  Object.keys(nodes).forEach((node) => {
    distances[node] = Infinity;
    unvisited.add(node);
  });

  distances[origin] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let minDist = Infinity;

    unvisited.forEach((node) => {
      if (distances[node] < minDist) {
        minDist = distances[node];
        current = node;
      }
    });

    if (current === null || distances[current] === Infinity) break;

    unvisited.delete(current);

    edges.forEach((edge) => {
      if (edge.from === current && unvisited.has(edge.to)) {
        const alt = distances[current] + edge.w;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
          previous[edge.to] = current;
        }
      }
      if (edge.to === current && unvisited.has(edge.from)) {
        const alt = distances[current] + edge.w;
        if (alt < distances[edge.from]) {
          distances[edge.from] = alt;
          previous[edge.from] = current;
        }
      }
    });
  }

  // Reconstruir caminho
  const path = [];
  let current = destination;

  while (current !== undefined) {
    path.unshift(nodes[current]);
    current = previous[current];
  }

  return path;
}