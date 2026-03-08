"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CelebrationProps {
  show: boolean
  isSuccess: boolean
  message: string
  subMessage?: string
  onClose: () => void
}

function Confetti() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    delay: number
    duration: number
    color: string
  }>>([])

  useEffect(() => {
    const colors = ["#22c55e", "#10b981", "#eab308", "#f97316", "#ec4899", "#8b5cf6"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Celebration({ show, isSuccess, message, subMessage, onClose }: CelebrationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <>
      {isSuccess && <Confetti />}
      
      <div 
        className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-40 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className={cn(
            "bg-card rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-300",
            isSuccess && "ring-4 ring-primary/50"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className={cn(
            "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
            isSuccess ? "bg-primary/20" : "bg-destructive/20"
          )}>
            {isSuccess ? (
              <span className="text-4xl animate-bounce">🧬</span>
            ) : (
              <span className="text-4xl">💡</span>
            )}
          </div>
          
          {/* Message */}
          <h2 className={cn(
            "text-2xl font-bold mb-2",
            isSuccess ? "text-primary" : "text-card-foreground"
          )}>
            {message}
          </h2>
          
          {subMessage && (
            <p className="text-muted-foreground leading-relaxed">
              {subMessage}
            </p>
          )}
          
          {/* Coins earned (success only) */}
          {isSuccess && (
            <div className="mt-4 inline-flex items-center gap-2 bg-chart-4/20 text-chart-5 px-4 py-2 rounded-full">
              <span className="text-xl">🪙</span>
              <span className="font-bold">+200 Monedas de ADN</span>
            </div>
          )}
          
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "mt-6 w-full py-3 rounded-xl font-semibold transition-all",
              isSuccess 
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {isSuccess ? "¡Continuar!" : "Intentar de nuevo"}
          </button>
        </div>
      </div>
    </>
  )
}
