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

    // Pontos destinos visiveis
    n0: { id: "n0", name: "Você está aqui", x: 145, y: 290 },
    n1: { id: "n1", name: "Entrada Principal", x: 60, y: 360 },
    n2: { id: "n2", name: "Elevadores", x: 173, y: 145 },
    n3: { id: "n3", name: "Banheiros", x: 300, y: 130 },
    n4: { id: "n4", name: "Salão Nobre", x: 145, y: 540 },
    n5: { id: "n5", name: "Biblioteca", x: 385, y: 145},
    n6: { id: "x6", name: "Cantina", x: 515, y: 510 },
    n7: { id: "n7", name: "Praça de Alimentação 'A'", x: 210, y: 690 },
    n8: { id: "n8", name: "Espaço Social", x: 365, y: 580 },
    n9: { id: "n9", name: "Bloco B", x: 759, y: 360 },
    n10: { id: "n10", name: "Igreja Bom Pastor", x: 450, y: 680 },
    n11: { id: "n11", name: "Estacionamento B", x: 610, y: 750 },

    //Pontos curvas invisíveis
    x0: {id: "x0", x:145 ,y:360 },
    x1: {id: "x1", x:265 ,y:360 },
    x2: {id: "x2", x:265 ,y:580 },
    xPracaAlimentacao: {id: "xPracaAlimentacao", x:265 ,y:690 }, //ponto que vai conectar diretamente a praçã de alimentação 'A'
    x3: {id: "x3", x:145, y:278},
    x4: {id: "x4", x:173, y:278},
    xBanheiro_Biblioteca: {id: "xBanheiro_Biblioteca", x:300, y:145},
    x5: {id: "x5", x:585, y:360},
    x6: {id: "x6", x:585, y:512},
    x7: {id: "x7", x:585, y:600},
    x8: {id: "x8", x:605, y:600},
    x9: {id: "x9", x:605, y:785},
    x10: {id: "x10", x:450, y:785},



  },
  edges: [
    // =======Rota para a entrada principal=======
    { from: "n0", to: "x0", w: 150 }, //Tottem -> x0
    { from: "x0", to: "n1", w: 130 }, //x0 -> Entrada Principal
    
    //=======Rota para o salão nobre=======
    { from: "x0", to: "n4", w: 130 }, //x0 -> Salão Nobre

    //=======Rota para o espaço social=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x2", w: 130 }, //x1 -> x2
    { from: "x2", to: "n8", w: 300 }, //x2 -> Espaço social
    
    //=======Rota para a Praça de alimentação=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x2", w: 130 }, //x1 -> x2
    { from: "x2", to: "xPracaAlimentacao", w: 300 }, //x2 -> xPracaAlimentacao
    { from: "xPracaAlimentacao", to: "n7", w: 300 }, //xPracaAlimentacao -> Praça de alimentação
    
    //=======Rota para os elevadores=======
    { from: "n0", to: "x3", w: 200 },
    { from: "x3", to: "x4", w: 200 },
    { from: "x4", to: "n2", w: 200 },
   
    //=======Rota para os banheiros=======
    { from: "n0", to: "x3", w: 200 },
    { from: "x3", to: "x4", w: 200 },
    { from: "x4", to: "n2", w: 200 },
    { from: "n2", to: "xBanheiro_Biblioteca", w: 200 },
    { from: "xBanheiro_Biblioteca", to: "n3", w: 200 },
   
    //=======Rota para a biblioteca=======
    { from: "n0", to: "x3", w: 200 },
    { from: "x3", to: "x4", w: 200 },
    { from: "x4", to: "n2", w: 200 },
    { from: "n2", to: "xBanheiro_Biblioteca", w: 200 },
    { from: "xBanheiro_Biblioteca", to: "n5", w: 200 },
   
    //=======Rota para o Bloco B=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x5", w: 130 }, //x0 -> x1
    { from: "x5", to: "n9", w: 130 }, //x1 -> Blobo B
   
    //=======Rota para Cantina=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x5", w: 130 }, //x1 -> x5
    { from: "x5", to: "x6", w: 130 }, //x5 -> x6
    { from: "x6", to: "n6", w: 130 }, //x6 -> Cantina
   
    //=======Rota para Estacionameto B=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x5", w: 130 }, //x1 -> x5
    { from: "x5", to: "x6", w: 130 }, //x5 -> x6
    { from: "x6", to: "x7", w: 130 }, //x6 -> x7
    { from: "x7", to: "x8", w: 130 }, //x7 -> x8
    { from: "x8", to: "n11", w: 130 }, //x8 -> Estacionamento B
   
    //=======Rota para Igreja Bom Pastor=======
    { from: "x0", to: "x1", w: 130 }, //x0 -> x1
    { from: "x1", to: "x5", w: 130 }, //x1 -> x5
    { from: "x5", to: "x6", w: 130 }, //x5 -> x6
    { from: "x6", to: "x7", w: 130 }, //x6 -> x7
    { from: "x7", to: "x8", w: 130 }, //x7 -> x8
    { from: "x8", to: "x9", w: 130 }, //x8 -> x9
    { from: "x9", to: "x10", w: 130 }, //x9 -> x10
    { from: "x10", to: "n10", w: 130 }, //x10 -> Igreja Bom pastor

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