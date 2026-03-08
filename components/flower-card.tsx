"use client"

import { Flor } from "@/lib/flores"
import { cn } from "@/lib/utils"

interface FlowerCardProps {
  flor: Flor
  isSelected?: boolean
  onClick?: () => void
  size?: "sm" | "md"
}

export function FlowerCard({ flor, isSelected, onClick, size = "md" }: FlowerCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center rounded-xl border-2 bg-card p-3 transition-all duration-200",
        "hover:scale-105 hover:shadow-lg hover:border-primary/50",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected && "border-primary shadow-lg scale-105",
        !isSelected && "border-border",
        size === "sm" && "p-2"
      )}
    >
      {/* Color indicator */}
      <div
        className={cn(
          "rounded-full mb-2 flex items-center justify-center shadow-inner",
          size === "md" ? "w-12 h-12 text-2xl" : "w-8 h-8 text-lg"
        )}
        style={{ backgroundColor: flor.colorHex + "30" }}
      >
        <span
          className="drop-shadow-sm"
          style={{ filter: `drop-shadow(0 0 4px ${flor.colorHex})` }}
        >
          {flor.icono}
        </span>
      </div>
      
      {/* Flower name */}
      <h3 className={cn(
        "font-medium text-card-foreground text-center leading-tight",
        size === "md" ? "text-sm" : "text-xs"
      )}>
        {flor.nombre}
      </h3>
      
      {/* Genotype badge */}
      <div
        className={cn(
          "mt-1.5 rounded-full px-2 py-0.5 font-mono font-bold",
          size === "md" ? "text-sm" : "text-xs",
          flor.esDominante 
            ? "bg-primary/20 text-primary" 
            : "bg-muted text-muted-foreground"
        )}
      >
        {flor.genotipo}
      </div>
      
      {/* Dominant/Recessive label */}
      <span className={cn(
        "mt-1 text-muted-foreground",
        size === "md" ? "text-xs" : "text-[10px]"
      )}>
        {flor.esDominante ? "Dominante" : "Recesivo"}
      </span>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <svg
            className="w-3 h-3 text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}
