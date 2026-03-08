"use client"

import { cn } from "@/lib/utils"

interface PunnettSquareProps {
  genotipo1: string
  genotipo2: string
  cuadro: string[][]
}

export function PunnettSquare({ genotipo1, genotipo2, cuadro }: PunnettSquareProps) {
  const alelos1 = genotipo1.split("")
  const alelos2 = genotipo2.split("")
  
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Cuadro de Punnett
      </h3>
      
      <div className="inline-block">
        {/* Header row */}
        <div className="grid grid-cols-3 gap-1">
          {/* Empty corner */}
          <div className="w-14 h-14 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">♀ / ♂</span>
          </div>
          
          {/* Parent 2 alleles (columns) */}
          {alelos2.map((alelo, i) => (
            <div
              key={`col-${i}`}
              className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center"
            >
              <span className={cn(
                "text-xl font-mono font-bold",
                alelo === alelo.toUpperCase() 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}>
                {alelo}
              </span>
            </div>
          ))}
        </div>
        
        {/* Data rows */}
        {cuadro.map((fila, i) => (
          <div key={`row-${i}`} className="grid grid-cols-3 gap-1 mt-1">
            {/* Parent 1 allele (row header) */}
            <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center">
              <span className={cn(
                "text-xl font-mono font-bold",
                alelos1[i] === alelos1[i].toUpperCase() 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}>
                {alelos1[i]}
              </span>
            </div>
            
            {/* Offspring cells */}
            {fila.map((genotipo, j) => {
              const esDominante = genotipo.split("").some(a => a === a.toUpperCase())
              return (
                <div
                  key={`cell-${i}-${j}`}
                  className={cn(
                    "w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300",
                    esDominante
                      ? "bg-primary/20 border-2 border-primary/40"
                      : "bg-muted border-2 border-muted-foreground/20"
                  )}
                >
                  <span className={cn(
                    "text-lg font-mono font-bold",
                    esDominante ? "text-primary" : "text-muted-foreground"
                  )}>
                    {genotipo}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40" />
          <span className="text-muted-foreground">Dominante</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-muted border border-muted-foreground/20" />
          <span className="text-muted-foreground">Recesivo</span>
        </div>
      </div>
    </div>
  )
}
