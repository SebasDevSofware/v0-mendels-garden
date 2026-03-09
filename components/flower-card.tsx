"use client"

import { Flor } from "@/lib/flores"
import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react"
import { FlowerIcon } from "./flower-icon"

interface FlowerCardProps {
  flor: Flor
  isSelected?: boolean
  onClick?: () => void
  size?: "sm" | "md"
  isDragging?: boolean
}

export function FlowerCard({ flor, isSelected, onClick, size = "md", isDragging }: FlowerCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(flor))
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center rounded-xl border-2 bg-card p-3 transition-all duration-200 cursor-grab active:cursor-grabbing",
        "hover:scale-105 hover:shadow-lg hover:border-primary/50",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected && "border-primary shadow-lg scale-105",
        !isSelected && "border-border",
        size === "sm" && "p-2",
        isDragging && "opacity-50 scale-95"
      )}
    >
      {/* Drag indicator */}
      <div className={cn(
        "absolute top-1 left-1 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors",
        size === "sm" && "hidden"
      )}>
        <GripVertical className="w-3 h-3" />
      </div>
      {/* Custom flower icon */}
      <div
        className={cn(
          "rounded-full mb-2 flex items-center justify-center",
          size === "md" ? "w-14 h-14" : "w-10 h-10"
        )}
        style={{ backgroundColor: flor.colorHex + "15" }}
      >
        <FlowerIcon
          color={flor.colorHex}
          secondaryColor={flor.colorSecundario}
          centerColor={flor.colorCentro}
          petalShape={flor.petalos}
          centerShape={flor.centro}
          petalCount={flor.numeroPetalos}
          size={size === "md" ? 44 : 32}
          animate={false}
        />
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
    </div>
  )
}
