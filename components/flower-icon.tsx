"use client"

import { cn } from "@/lib/utils"
import type { CaracteristicaEspecial, GenCaracteristica } from "@/lib/flores"

export type PetalShape = "rounded" | "pointed" | "heart" | "wavy" | "tulip"
export type CenterShape = "circle" | "star" | "dots" | "spiral"

interface FlowerIconProps {
  color: string
  secondaryColor?: string
  centerColor?: string
  petalShape?: PetalShape
  centerShape?: CenterShape
  petalCount?: number
  size?: number
  className?: string
  animate?: boolean
  withStem?: boolean
  withLeaves?: boolean
  // Nuevas propiedades para caracteristicas especiales
  caracteristicas?: GenCaracteristica[]
}

export function FlowerIcon({
  color,
  secondaryColor,
  centerColor = "#fbbf24",
  petalShape = "rounded",
  centerShape = "circle",
  petalCount = 5,
  size = 48,
  className,
  animate = false,
  withStem = false,
  withLeaves = false,
  caracteristicas = [],
}: FlowerIconProps) {
  const viewBoxSize = 100
  const center = viewBoxSize / 2
  const petalLength = 28
  const petalWidth = 18

  // Verificar caracteristicas activas (expresadas)
  const tieneEspinas = caracteristicas.some(c => 
    c.nombre === "espinas" && c.genotipo.split("").some(a => a === a.toUpperCase())
  )
  const tieneVeneno = caracteristicas.some(c => 
    c.nombre === "venenosa" && c.genotipo === c.genotipo.toUpperCase()
  )
  const tieneManchas = caracteristicas.some(c => 
    c.nombre === "manchas" && c.genotipo.split("").some(a => a === a.toUpperCase())
  )
  const tieneBioluminiscencia = caracteristicas.some(c => 
    c.nombre === "bioluminiscente" && c.genotipo === c.genotipo.toUpperCase()
  )
  const tieneFragancia = caracteristicas.some(c => 
    c.nombre === "fragante" && c.genotipo.split("").some(a => a === a.toUpperCase())
  )
  const tieneDoble = caracteristicas.some(c => 
    c.nombre === "doble" && c.genotipo.split("").some(a => a === a.toUpperCase())
  )

  // Generate petal paths based on shape
  const generatePetal = (angle: number, index: number) => {
    const radians = (angle * Math.PI) / 180
    const x = center + Math.cos(radians) * petalLength * 0.6
    const y = center + Math.sin(radians) * petalLength * 0.6

    // Use secondary color for alternating petals if provided
    const petalColor = secondaryColor && index % 2 === 1 ? secondaryColor : color

    switch (petalShape) {
      case "pointed":
        return (
          <path
            key={index}
            d={`
              M ${center} ${center}
              Q ${center + Math.cos(radians - 0.3) * petalLength * 0.7} ${center + Math.sin(radians - 0.3) * petalLength * 0.7}
                ${center + Math.cos(radians) * petalLength} ${center + Math.sin(radians) * petalLength}
              Q ${center + Math.cos(radians + 0.3) * petalLength * 0.7} ${center + Math.sin(radians + 0.3) * petalLength * 0.7}
                ${center} ${center}
            `}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="1"
            className={cn(animate && "origin-center")}
            style={animate ? { 
              animation: `petalPulse 2s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`
            } : undefined}
          />
        )

      case "heart":
        return (
          <g key={index} transform={`rotate(${angle} ${center} ${center})`}>
            <path
              d={`
                M ${center} ${center - 5}
                C ${center - petalWidth * 0.8} ${center - petalLength * 0.6}
                  ${center - petalWidth * 0.4} ${center - petalLength}
                  ${center} ${center - petalLength * 0.7}
                C ${center + petalWidth * 0.4} ${center - petalLength}
                  ${center + petalWidth * 0.8} ${center - petalLength * 0.6}
                  ${center} ${center - 5}
              `}
              fill={petalColor}
              stroke={petalColor}
              strokeWidth="1"
              className={cn(animate && "origin-center")}
              style={animate ? { 
                animation: `petalPulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`
              } : undefined}
            />
          </g>
        )

      case "wavy":
        return (
          <g key={index} transform={`rotate(${angle} ${center} ${center})`}>
            <path
              d={`
                M ${center - petalWidth * 0.3} ${center}
                Q ${center - petalWidth * 0.6} ${center - petalLength * 0.3}
                  ${center - petalWidth * 0.3} ${center - petalLength * 0.5}
                Q ${center - petalWidth * 0.5} ${center - petalLength * 0.8}
                  ${center} ${center - petalLength}
                Q ${center + petalWidth * 0.5} ${center - petalLength * 0.8}
                  ${center + petalWidth * 0.3} ${center - petalLength * 0.5}
                Q ${center + petalWidth * 0.6} ${center - petalLength * 0.3}
                  ${center + petalWidth * 0.3} ${center}
                Z
              `}
              fill={petalColor}
              stroke={petalColor}
              strokeWidth="1"
              className={cn(animate && "origin-center")}
              style={animate ? { 
                animation: `petalPulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`
              } : undefined}
            />
          </g>
        )

      case "tulip":
        return (
          <g key={index} transform={`rotate(${angle} ${center} ${center})`}>
            <path
              d={`
                M ${center} ${center}
                C ${center - petalWidth * 0.8} ${center - petalLength * 0.2}
                  ${center - petalWidth * 0.6} ${center - petalLength * 0.8}
                  ${center} ${center - petalLength}
                C ${center + petalWidth * 0.6} ${center - petalLength * 0.8}
                  ${center + petalWidth * 0.8} ${center - petalLength * 0.2}
                  ${center} ${center}
              `}
              fill={petalColor}
              stroke={petalColor}
              strokeWidth="1"
              className={cn(animate && "origin-center")}
              style={animate ? { 
                animation: `petalPulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`
              } : undefined}
            />
          </g>
        )

      default: // rounded
        return (
          <ellipse
            key={index}
            cx={x}
            cy={y}
            rx={petalWidth * 0.6}
            ry={petalLength * 0.5}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="1"
            transform={`rotate(${angle} ${x} ${y})`}
            className={cn(animate && "origin-center")}
            style={animate ? { 
              animation: `petalPulse 2s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`
            } : undefined}
          />
        )
    }
  }

  // Generate center based on shape
  const generateCenter = () => {
    switch (centerShape) {
      case "star":
        const starPoints = []
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * 72 - 90) * (Math.PI / 180)
          const innerAngle = ((i * 72 + 36) - 90) * (Math.PI / 180)
          starPoints.push(
            `${center + Math.cos(outerAngle) * 10},${center + Math.sin(outerAngle) * 10}`
          )
          starPoints.push(
            `${center + Math.cos(innerAngle) * 5},${center + Math.sin(innerAngle) * 5}`
          )
        }
        return (
          <polygon
            points={starPoints.join(" ")}
            fill={centerColor}
            stroke={centerColor}
            strokeWidth="1"
          />
        )

      case "dots":
        return (
          <g>
            <circle cx={center} cy={center} r={8} fill={centerColor} />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle
                key={i}
                cx={center + Math.cos((angle * Math.PI) / 180) * 5}
                cy={center + Math.sin((angle * Math.PI) / 180) * 5}
                r={2}
                fill={`${centerColor}aa`}
              />
            ))}
          </g>
        )

      case "spiral":
        const spiralPath = []
        for (let i = 0; i < 720; i += 30) {
          const r = (i / 720) * 8
          const angle = (i * Math.PI) / 180
          spiralPath.push(
            `${i === 0 ? "M" : "L"} ${center + Math.cos(angle) * r} ${center + Math.sin(angle) * r}`
          )
        }
        return (
          <g>
            <circle cx={center} cy={center} r={10} fill={centerColor} />
            <path
              d={spiralPath.join(" ")}
              fill="none"
              stroke={`${centerColor}88`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )

      default: // circle
        return (
          <circle
            cx={center}
            cy={center}
            r={10}
            fill={centerColor}
            stroke={`${centerColor}88`}
            strokeWidth="2"
          />
        )
    }
  }

  // Generate petals
  const petals = []
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i - 90
    petals.push(generatePetal(angle, i))
  }

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${withStem ? viewBoxSize + 40 : viewBoxSize}`}
      width={size}
      height={withStem ? size * 1.4 : size}
      className={cn("drop-shadow-sm", className)}
      style={{ filter: `drop-shadow(0 2px 4px ${color}40)` }}
    >
      {/* Stem and leaves */}
      {withStem && (
        <g>
          <path
            d={`M ${center} ${center + 10} Q ${center + 5} ${center + 30} ${center} ${viewBoxSize + 35}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {withLeaves && (
            <>
              <path
                d={`M ${center} ${center + 25} Q ${center - 15} ${center + 20} ${center - 20} ${center + 30} Q ${center - 10} ${center + 35} ${center} ${center + 30}`}
                fill="#22c55e"
                stroke="#16a34a"
                strokeWidth="1"
              />
              <path
                d={`M ${center} ${center + 40} Q ${center + 15} ${center + 35} ${center + 20} ${center + 45} Q ${center + 10} ${center + 50} ${center} ${center + 45}`}
                fill="#22c55e"
                stroke="#16a34a"
                strokeWidth="1"
              />
            </>
          )}
        </g>
      )}

      {/* Petals */}
      <g className={cn(animate && "animate-pulse")}>
        {petals}
      </g>

      {/* Center */}
      {generateCenter()}

      {/* Caracteristicas especiales visuales */}
      
      {/* Manchas en petalos */}
      {tieneManchas && (
        <g>
          {Array.from({ length: 5 }, (_, i) => {
            const angle = (360 / 5) * i - 90
            const rad = (angle * Math.PI) / 180
            const x = center + Math.cos(rad) * 20
            const y = center + Math.sin(rad) * 20
            return (
              <circle
                key={`mancha-${i}`}
                cx={x}
                cy={y}
                r={3}
                fill="#00000030"
              />
            )
          })}
        </g>
      )}

      {/* Bioluminiscencia (brillo) */}
      {tieneBioluminiscencia && (
        <g>
          <circle
            cx={center}
            cy={center}
            r={35}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            opacity="0.6"
            className="animate-pulse"
          />
          <circle
            cx={center}
            cy={center}
            r={40}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            opacity="0.3"
            className="animate-pulse"
          />
        </g>
      )}

      {/* Icono de veneno */}
      {tieneVeneno && (
        <g transform={`translate(${viewBoxSize - 18}, 5)`}>
          <circle cx="8" cy="8" r="8" fill="#7c3aed" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</text>
        </g>
      )}

      {/* Icono de fragancia */}
      {tieneFragancia && (
        <g transform={`translate(5, 5)`} opacity="0.7">
          {[0, 1, 2].map(i => (
            <path
              key={`fragancia-${i}`}
              d={`M ${4 + i * 5} 12 Q ${6 + i * 5} 6 ${4 + i * 5} 0`}
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      )}
    </svg>
  )
}

// Preset flower configurations based on real flower types
export const flowerPresets = {
  orquidea: {
    petalShape: "wavy" as PetalShape,
    petalCount: 5,
    centerShape: "dots" as CenterShape,
  },
  rosa: {
    petalShape: "heart" as PetalShape,
    petalCount: 8,
    centerShape: "spiral" as CenterShape,
  },
  tulipan: {
    petalShape: "tulip" as PetalShape,
    petalCount: 6,
    centerShape: "circle" as CenterShape,
  },
  margarita: {
    petalShape: "pointed" as PetalShape,
    petalCount: 12,
    centerShape: "circle" as CenterShape,
  },
  girasol: {
    petalShape: "pointed" as PetalShape,
    petalCount: 16,
    centerShape: "dots" as CenterShape,
  },
}

// Helper to get preset from flower name
export function getFlowerPreset(nombre: string) {
  const lowerName = nombre.toLowerCase()
  if (lowerName.includes("orquídea") || lowerName.includes("orquidea")) {
    return flowerPresets.orquidea
  }
  if (lowerName.includes("rosa")) {
    return flowerPresets.rosa
  }
  if (lowerName.includes("tulipán") || lowerName.includes("tulipan")) {
    return flowerPresets.tulipan
  }
  if (lowerName.includes("margarita")) {
    return flowerPresets.margarita
  }
  if (lowerName.includes("girasol")) {
    return flowerPresets.girasol
  }
  return flowerPresets.rosa // default
}
