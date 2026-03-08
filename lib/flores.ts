export interface Flor {
  id: string
  nombre: string
  color: string
  colorHex: string
  genotipo: string
  esDominante: boolean
  icono: string
}

export const flores: Flor[] = [
  {
    id: "orquidea-purpura",
    nombre: "Orquídea Púrpura",
    color: "Púrpura",
    colorHex: "#9333ea",
    genotipo: "PP",
    esDominante: true,
    icono: "🌸",
  },
  {
    id: "orquidea-amarilla",
    nombre: "Orquídea Amarilla",
    color: "Amarillo",
    colorHex: "#eab308",
    genotipo: "pp",
    esDominante: false,
    icono: "🌼",
  },
  {
    id: "rosa-roja",
    nombre: "Rosa Roja",
    color: "Rojo",
    colorHex: "#dc2626",
    genotipo: "RR",
    esDominante: true,
    icono: "🌹",
  },
  {
    id: "rosa-blanca",
    nombre: "Rosa Blanca",
    color: "Blanco",
    colorHex: "#f5f5f4",
    genotipo: "rr",
    esDominante: false,
    icono: "🤍",
  },
  {
    id: "rosa-rosa",
    nombre: "Rosa Rosa",
    color: "Rosa",
    colorHex: "#f472b6",
    genotipo: "Rr",
    esDominante: true,
    icono: "🌷",
  },
  {
    id: "tulipan-naranja",
    nombre: "Tulipán Naranja",
    color: "Naranja",
    colorHex: "#f97316",
    genotipo: "TT",
    esDominante: true,
    icono: "🌷",
  },
  {
    id: "tulipan-verde",
    nombre: "Tulipán Verde",
    color: "Verde",
    colorHex: "#22c55e",
    genotipo: "tt",
    esDominante: false,
    icono: "🌿",
  },
  {
    id: "tulipan-mixto",
    nombre: "Tulipán Mixto",
    color: "Naranja-Verde",
    colorHex: "#84cc16",
    genotipo: "Tt",
    esDominante: true,
    icono: "🌱",
  },
]

export function calcularPunnett(genotipo1: string, genotipo2: string): string[][] {
  const alelos1 = genotipo1.split("")
  const alelos2 = genotipo2.split("")
  
  const cuadro: string[][] = []
  
  for (let i = 0; i < 2; i++) {
    const fila: string[] = []
    for (let j = 0; j < 2; j++) {
      // Ordenar alfabéticamente pero mayúscula primero
      const par = [alelos1[i], alelos2[j]].sort((a, b) => {
        if (a.toLowerCase() === b.toLowerCase()) {
          return a < b ? -1 : 1 // Mayúscula antes que minúscula
        }
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
      fila.push(par.join(""))
    }
    cuadro.push(fila)
  }
  
  return cuadro
}

export function calcularProbabilidadDominante(cuadro: string[][]): number {
  let dominantes = 0
  const total = 4
  
  for (const fila of cuadro) {
    for (const genotipo of fila) {
      // Si hay al menos una mayúscula, es dominante
      if (genotipo.split("").some(alelo => alelo === alelo.toUpperCase())) {
        dominantes++
      }
    }
  }
  
  return Math.round((dominantes / total) * 100)
}

export function obtenerColorDominante(genotipo1: string, genotipo2: string): string {
  // Obtener la letra base (sin importar mayúscula/minúscula)
  const letraBase = genotipo1[0].toUpperCase()
  
  // Encontrar flores con este gen
  const florDominante = flores.find(f => 
    f.genotipo.includes(letraBase) && f.esDominante
  )
  
  return florDominante?.color || "Dominante"
}
