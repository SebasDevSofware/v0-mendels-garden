"use client"

import { useState } from "react"
import { Flor } from "@/lib/flores"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"

interface PlantSlotProps {
  label: string
  flor: Flor | null
  onClear?: () => void
  onDrop?: (flor: Flor) => void
  isActive?: boolean
}

export function PlantSlot({ label, flor, onClear, onDrop, isActive }: PlantSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    try {
      const data = e.dataTransfer.getData("application/json")
      const droppedFlor: Flor = JSON.parse(data)
      onDrop?.(droppedFlor)
    } catch {
      // Invalid drop data
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative w-28 h-28 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-300",
          flor 
            ? "border-primary bg-primary/10" 
            : isDragOver
              ? "border-primary bg-primary/20 scale-110"
              : isActive
                ? "border-primary/50 bg-primary/5"
                : "border-border bg-muted/50",
          !flor && !isDragOver && "hover:border-primary/30"
        )}
      >
        {flor ? (
          <div className="flex flex-col items-center">
            <span 
              className="text-4xl drop-shadow-lg"
              style={{ filter: `drop-shadow(0 0 8px ${flor.colorHex})` }}
            >
              {flor.icono}
            </span>
            <span className="mt-1 font-mono text-sm font-bold text-primary">
              {flor.genotipo}
            </span>
            
            {/* Clear button */}
            <button
              onClick={onClear}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              aria-label="Quitar planta"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Plus className={cn(
            "w-8 h-8 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
        )}
      </div>
      {flor && (
        <p className="text-xs text-center text-muted-foreground max-w-24 leading-tight">
          {flor.nombre}
        </p>
      )}
    </div>
  )
}
