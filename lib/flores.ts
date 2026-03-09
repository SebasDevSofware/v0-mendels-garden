export type PetalShape = "rounded" | "pointed" | "heart" | "wavy" | "tulip"
export type CenterShape = "circle" | "star" | "dots" | "spiral"

// Caracteristicas especiales que afectan la apariencia y genetica
export type CaracteristicaEspecial = 
  | "espinas"      // Tiene espinas (dominante)
  | "venenosa"     // Es venenosa (recesivo)
  | "manchas"      // Tiene manchas en los petalos (codominante)
  | "bioluminiscente" // Brilla en la oscuridad (recesivo)
  | "fragante"     // Tiene aroma fuerte (dominante)
  | "doble"        // Petalos dobles (dominante)

export interface GenCaracteristica {
  nombre: CaracteristicaEspecial
  genotipo: string // Ej: "EE", "Ee", "ee"
  esDominante: boolean
}

export interface Flor {
  id: string
  nombre: string
  color: string
  colorHex: string
  colorSecundario?: string
  colorCentro?: string
  genotipo: string // Gen del color
  esDominante: boolean
  petalos?: PetalShape
  centro?: CenterShape
  numeroPetalos?: number
  // Nuevas caracteristicas especiales
  caracteristicas?: GenCaracteristica[]
  descripcion?: string
}

export const flores: Flor[] = [
  // === ORQUIDEAS (Gen P) ===
  {
    id: "orquidea-purpura",
    nombre: "Orquídea Púrpura",
    color: "Púrpura",
    colorHex: "#9333ea",
    colorSecundario: "#a855f7",
    colorCentro: "#fbbf24",
    genotipo: "PP",
    esDominante: true,
    petalos: "wavy",
    centro: "dots",
    numeroPetalos: 5,
    caracteristicas: [
      { nombre: "fragante", genotipo: "FF", esDominante: true }
    ],
    descripcion: "Aroma intenso y penetrante"
  },
  {
    id: "orquidea-amarilla",
    nombre: "Orquídea Amarilla",
    color: "Amarillo",
    colorHex: "#eab308",
    colorSecundario: "#fde047",
    colorCentro: "#f97316",
    genotipo: "pp",
    esDominante: false,
    petalos: "wavy",
    centro: "dots",
    numeroPetalos: 5,
    caracteristicas: [
      { nombre: "fragante", genotipo: "ff", esDominante: false }
    ],
    descripcion: "Sin aroma perceptible"
  },
  {
    id: "orquidea-hibrida",
    nombre: "Orquídea Híbrida",
    color: "Lavanda",
    colorHex: "#c084fc",
    colorSecundario: "#e9d5ff",
    colorCentro: "#fbbf24",
    genotipo: "Pp",
    esDominante: true,
    petalos: "wavy",
    centro: "dots",
    numeroPetalos: 5,
    caracteristicas: [
      { nombre: "fragante", genotipo: "Ff", esDominante: true }
    ],
    descripcion: "Aroma suave y delicado"
  },

  // === ROSAS (Gen R) ===
  {
    id: "rosa-roja",
    nombre: "Rosa Roja",
    color: "Rojo",
    colorHex: "#dc2626",
    colorSecundario: "#ef4444",
    colorCentro: "#fbbf24",
    genotipo: "RR",
    esDominante: true,
    petalos: "heart",
    centro: "spiral",
    numeroPetalos: 8,
    caracteristicas: [
      { nombre: "espinas", genotipo: "EE", esDominante: true }
    ],
    descripcion: "Espinas grandes y afiladas"
  },
  {
    id: "rosa-blanca",
    nombre: "Rosa Blanca",
    color: "Blanco",
    colorHex: "#fafaf9",
    colorSecundario: "#e7e5e4",
    colorCentro: "#fcd34d",
    genotipo: "rr",
    esDominante: false,
    petalos: "heart",
    centro: "spiral",
    numeroPetalos: 8,
    caracteristicas: [
      { nombre: "espinas", genotipo: "ee", esDominante: false }
    ],
    descripcion: "Sin espinas, tallo suave"
  },
  {
    id: "rosa-rosa",
    nombre: "Rosa Rosa",
    color: "Rosa",
    colorHex: "#f472b6",
    colorSecundario: "#f9a8d4",
    colorCentro: "#fbbf24",
    genotipo: "Rr",
    esDominante: true,
    petalos: "heart",
    centro: "spiral",
    numeroPetalos: 8,
    caracteristicas: [
      { nombre: "espinas", genotipo: "Ee", esDominante: true }
    ],
    descripcion: "Espinas pequenas"
  },
  {
    id: "rosa-doble",
    nombre: "Rosa Doble",
    color: "Coral",
    colorHex: "#fb7185",
    colorSecundario: "#fda4af",
    colorCentro: "#fbbf24",
    genotipo: "RR",
    esDominante: true,
    petalos: "heart",
    centro: "spiral",
    numeroPetalos: 12,
    caracteristicas: [
      { nombre: "doble", genotipo: "DD", esDominante: true },
      { nombre: "espinas", genotipo: "EE", esDominante: true }
    ],
    descripcion: "Petalos dobles con espinas"
  },

  // === TULIPANES (Gen T) ===
  {
    id: "tulipan-naranja",
    nombre: "Tulipán Naranja",
    color: "Naranja",
    colorHex: "#f97316",
    colorSecundario: "#fb923c",
    colorCentro: "#fbbf24",
    genotipo: "TT",
    esDominante: true,
    petalos: "tulip",
    centro: "circle",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "manchas", genotipo: "MM", esDominante: true }
    ],
    descripcion: "Manchas oscuras en la base"
  },
  {
    id: "tulipan-verde",
    nombre: "Tulipán Verde",
    color: "Verde",
    colorHex: "#22c55e",
    colorSecundario: "#4ade80",
    colorCentro: "#fbbf24",
    genotipo: "tt",
    esDominante: false,
    petalos: "tulip",
    centro: "circle",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "manchas", genotipo: "mm", esDominante: false }
    ],
    descripcion: "Petalos uniformes sin manchas"
  },
  {
    id: "tulipan-mixto",
    nombre: "Tulipán Mixto",
    color: "Naranja-Verde",
    colorHex: "#84cc16",
    colorSecundario: "#f97316",
    colorCentro: "#fbbf24",
    genotipo: "Tt",
    esDominante: true,
    petalos: "tulip",
    centro: "circle",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "manchas", genotipo: "Mm", esDominante: true }
    ],
    descripcion: "Manchas tenues visibles"
  },

  // === LIRIOS (Gen L) ===
  {
    id: "lirio-azul",
    nombre: "Lirio Azul",
    color: "Azul",
    colorHex: "#3b82f6",
    colorSecundario: "#60a5fa",
    colorCentro: "#fbbf24",
    genotipo: "LL",
    esDominante: true,
    petalos: "pointed",
    centro: "star",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "venenosa", genotipo: "VV", esDominante: false }
    ],
    descripcion: "Altamente toxica, manipular con cuidado"
  },
  {
    id: "lirio-blanco",
    nombre: "Lirio Blanco",
    color: "Blanco",
    colorHex: "#f8fafc",
    colorSecundario: "#e2e8f0",
    colorCentro: "#f59e0b",
    genotipo: "ll",
    esDominante: false,
    petalos: "pointed",
    centro: "star",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "venenosa", genotipo: "vv", esDominante: true }
    ],
    descripcion: "No toxica, segura para mascotas"
  },
  {
    id: "lirio-celeste",
    nombre: "Lirio Celeste",
    color: "Celeste",
    colorHex: "#7dd3fc",
    colorSecundario: "#bae6fd",
    colorCentro: "#fbbf24",
    genotipo: "Ll",
    esDominante: true,
    petalos: "pointed",
    centro: "star",
    numeroPetalos: 6,
    caracteristicas: [
      { nombre: "venenosa", genotipo: "Vv", esDominante: false }
    ],
    descripcion: "Ligeramente toxica"
  },

  // === GIRASOLES (Gen G) ===
  {
    id: "girasol-dorado",
    nombre: "Girasol Dorado",
    color: "Dorado",
    colorHex: "#fbbf24",
    colorSecundario: "#fcd34d",
    colorCentro: "#78350f",
    genotipo: "GG",
    esDominante: true,
    petalos: "pointed",
    centro: "dots",
    numeroPetalos: 16,
    caracteristicas: [
      { nombre: "bioluminiscente", genotipo: "BB", esDominante: false }
    ],
    descripcion: "Brilla intensamente de noche"
  },
  {
    id: "girasol-palido",
    nombre: "Girasol Pálido",
    color: "Crema",
    colorHex: "#fef3c7",
    colorSecundario: "#fde68a",
    colorCentro: "#92400e",
    genotipo: "gg",
    esDominante: false,
    petalos: "pointed",
    centro: "dots",
    numeroPetalos: 16,
    caracteristicas: [
      { nombre: "bioluminiscente", genotipo: "bb", esDominante: true }
    ],
    descripcion: "No emite luz"
  },
  {
    id: "girasol-limon",
    nombre: "Girasol Limón",
    color: "Limón",
    colorHex: "#facc15",
    colorSecundario: "#fef08a",
    colorCentro: "#854d0e",
    genotipo: "Gg",
    esDominante: true,
    petalos: "pointed",
    centro: "dots",
    numeroPetalos: 16,
    caracteristicas: [
      { nombre: "bioluminiscente", genotipo: "Bb", esDominante: false }
    ],
    descripcion: "Brillo tenue nocturno"
  },

  // === MARGARITAS (Gen M) ===
  {
    id: "margarita-blanca",
    nombre: "Margarita Blanca",
    color: "Blanco",
    colorHex: "#ffffff",
    colorSecundario: "#f1f5f9",
    colorCentro: "#eab308",
    genotipo: "MM",
    esDominante: true,
    petalos: "rounded",
    centro: "circle",
    numeroPetalos: 12,
    descripcion: "Clasica margarita de campo"
  },
  {
    id: "margarita-rosa",
    nombre: "Margarita Rosa",
    color: "Rosa Claro",
    colorHex: "#fce7f3",
    colorSecundario: "#fbcfe8",
    colorCentro: "#ca8a04",
    genotipo: "mm",
    esDominante: false,
    petalos: "rounded",
    centro: "circle",
    numeroPetalos: 12,
    descripcion: "Variedad rosa silvestre"
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

// Calcular Punnett para una caracteristica especifica
export function calcularPunnettCaracteristica(
  genotipo1: string,
  genotipo2: string
): string[][] {
  const alelos1 = genotipo1.split("")
  const alelos2 = genotipo2.split("")
  
  const cuadro: string[][] = []
  
  for (let i = 0; i < 2; i++) {
    const fila: string[] = []
    for (let j = 0; j < 2; j++) {
      const par = [alelos1[i], alelos2[j]].sort((a, b) => {
        if (a.toLowerCase() === b.toLowerCase()) {
          return a < b ? -1 : 1
        }
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
      fila.push(par.join(""))
    }
    cuadro.push(fila)
  }
  
  return cuadro
}

// Calcular probabilidad de expresion de una caracteristica
// Algunas caracteristicas son dominantes, otras recesivas
export function calcularProbabilidadCaracteristica(
  cuadro: string[][],
  esRecesivo: boolean = false
): number {
  let expresados = 0
  const total = 4
  
  for (const fila of cuadro) {
    for (const genotipo of fila) {
      if (esRecesivo) {
        // Para rasgos recesivos (venenosa, bioluminiscente), necesita ser homocigoto recesivo
        if (genotipo === genotipo.toLowerCase()) {
          expresados++
        }
      } else {
        // Para rasgos dominantes, al menos un alelo dominante
        if (genotipo.split("").some(alelo => alelo === alelo.toUpperCase())) {
          expresados++
        }
      }
    }
  }
  
  return Math.round((expresados / total) * 100)
}

// Obtener descripcion de la caracteristica
export function getDescripcionCaracteristica(nombre: CaracteristicaEspecial): string {
  const descripciones: Record<CaracteristicaEspecial, string> = {
    espinas: "Espinas",
    venenosa: "Venenosa",
    manchas: "Manchas",
    bioluminiscente: "Bioluminiscente",
    fragante: "Fragante",
    doble: "Petalos Dobles"
  }
  return descripciones[nombre]
}

// Verificar si una caracteristica es recesiva (solo se expresa en homocigoto recesivo)
export function esCaracteristicaRecesiva(nombre: CaracteristicaEspecial): boolean {
  // Estas caracteristicas solo se expresan completamente en homocigoto recesivo
  return nombre === "venenosa" || nombre === "bioluminiscente"
}
