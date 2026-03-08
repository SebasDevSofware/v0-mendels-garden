"use client"

import { useState, useMemo, useCallback } from "react"
import { FlowerCard } from "@/components/flower-card"
import { PlantSlot } from "@/components/plant-slot"
import { PunnettSquare } from "@/components/punnett-square"
import { Celebration } from "@/components/celebration"
import { 
  flores, 
  Flor, 
  calcularPunnett, 
  calcularProbabilidadDominante,
  obtenerColorDominante 
} from "@/lib/flores"
import { Dna, Sparkles, BookOpen, FlaskConical } from "lucide-react"

export default function JardinGenetico() {
  const [plantaMadre, setPlantaMadre] = useState<Flor | null>(null)
  const [plantaPadre, setPlantaPadre] = useState<Flor | null>(null)
  const [probabilidadUsuario, setProbabilidadUsuario] = useState<string>("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeSlot, setActiveSlot] = useState<"madre" | "padre">("madre")

  // Calculate Punnett square when both parents are selected
  const cuadroPunnett = useMemo(() => {
    if (!plantaMadre || !plantaPadre) return null
    
    // Check if genotypes are compatible (same gene type)
    const gen1 = plantaMadre.genotipo[0].toLowerCase()
    const gen2 = plantaPadre.genotipo[0].toLowerCase()
    
    if (gen1 !== gen2) return null
    
    return calcularPunnett(plantaMadre.genotipo, plantaPadre.genotipo)
  }, [plantaMadre, plantaPadre])

  // Calculate correct probability
  const probabilidadCorrecta = useMemo(() => {
    if (!cuadroPunnett) return null
    return calcularProbabilidadDominante(cuadroPunnett)
  }, [cuadroPunnett])

  // Get dominant color name
  const colorDominante = useMemo(() => {
    if (!plantaMadre || !plantaPadre) return ""
    return obtenerColorDominante(plantaMadre.genotipo, plantaPadre.genotipo)
  }, [plantaMadre, plantaPadre])

  // Handle flower selection
  const handleFlowerSelect = useCallback((flor: Flor) => {
    if (activeSlot === "madre") {
      setPlantaMadre(flor)
      setActiveSlot("padre")
    } else {
      setPlantaPadre(flor)
    }
    setProbabilidadUsuario("")
    setShowCelebration(false)
  }, [activeSlot])

  // Handle harvest (validation)
  const handleCosechar = useCallback(() => {
    if (probabilidadCorrecta === null) return
    
    const respuestaUsuario = parseInt(probabilidadUsuario)
    if (isNaN(respuestaUsuario)) return
    
    const esCorrecta = respuestaUsuario === probabilidadCorrecta
    setIsSuccess(esCorrecta)
    setShowCelebration(true)
  }, [probabilidadUsuario, probabilidadCorrecta])

  // Reset breeding area
  const handleReset = useCallback(() => {
    setPlantaMadre(null)
    setPlantaPadre(null)
    setProbabilidadUsuario("")
    setActiveSlot("madre")
    setShowCelebration(false)
  }, [])

  // Filter compatible flowers for second parent
  const floresCompatibles = useMemo(() => {
    if (!plantaMadre) return flores
    const genMadre = plantaMadre.genotipo[0].toLowerCase()
    return flores.filter(f => f.genotipo[0].toLowerCase() === genMadre)
  }, [plantaMadre])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Dna className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Jardín Genético</h1>
              <p className="text-xs text-muted-foreground">Aprende Cuadros de Punnett</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🪙</span>
            <span className="font-semibold text-secondary-foreground">1,250</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar - Inventory */}
          <aside className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border p-4 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-card-foreground">Códice de Flores</h2>
              </div>
              
              <p className="text-xs text-muted-foreground mb-4">
                Selecciona flores para cruzar. Las del mismo gen son compatibles.
              </p>
              
              <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
                {(plantaMadre ? floresCompatibles : flores).map((flor) => (
                  <FlowerCard
                    key={flor.id}
                    flor={flor}
                    size="sm"
                    isSelected={
                      flor.id === plantaMadre?.id || flor.id === plantaPadre?.id
                    }
                    onClick={() => handleFlowerSelect(flor)}
                  />
                ))}
              </div>
              
              {plantaMadre && floresCompatibles.length < flores.length && (
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Mostrando flores compatibles con gen {plantaMadre.genotipo[0]}
                </p>
              )}
            </div>
          </aside>

          {/* Main Area - Breeding */}
          <main className="lg:col-span-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FlaskConical className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-card-foreground">El Sembradío</h2>
              </div>
              
              {/* Plant Slots */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <PlantSlot
                  label="Planta Madre ♀"
                  flor={plantaMadre}
                  onClear={() => {
                    setPlantaMadre(null)
                    setActiveSlot("madre")
                    setProbabilidadUsuario("")
                  }}
                  isActive={activeSlot === "madre" && !plantaMadre}
                />
                
                <div className="flex flex-col items-center text-muted-foreground">
                  <span className="text-3xl">×</span>
                </div>
                
                <PlantSlot
                  label="Planta Padre ♂"
                  flor={plantaPadre}
                  onClear={() => {
                    setPlantaPadre(null)
                    setActiveSlot("padre")
                    setProbabilidadUsuario("")
                  }}
                  isActive={activeSlot === "padre" && !plantaPadre}
                />
              </div>
              
              {/* Punnett Square */}
              {cuadroPunnett && plantaMadre && plantaPadre ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <PunnettSquare
                    genotipo1={plantaMadre.genotipo}
                    genotipo2={plantaPadre.genotipo}
                    cuadro={cuadroPunnett}
                  />
                </div>
              ) : plantaMadre && plantaPadre ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>❌ Estas plantas no son compatibles.</p>
                  <p className="text-sm mt-1">Selecciona flores del mismo tipo de gen.</p>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Selecciona dos plantas para ver su cruce</p>
                </div>
              )}
              
              {/* Reset button */}
              {(plantaMadre || plantaPadre) && (
                <button
                  onClick={handleReset}
                  className="mt-6 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  🔄 Reiniciar cruce
                </button>
              )}
            </div>
          </main>

          {/* Right Panel - Controls */}
          <aside className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border p-4 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-card-foreground">Panel de Control</h2>
              </div>
              
              {cuadroPunnett ? (
                <div className="space-y-4">
                  {/* Question */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <label 
                      htmlFor="probabilidad"
                      className="block text-sm font-medium text-card-foreground mb-3 leading-relaxed"
                    >
                      ¿Qué probabilidad (0-100%) hay de que la descendencia sea de color{" "}
                      <span className="text-primary font-semibold">{colorDominante}</span>?
                    </label>
                    
                    <div className="relative">
                      <input
                        id="probabilidad"
                        type="number"
                        min="0"
                        max="100"
                        value={probabilidadUsuario}
                        onChange={(e) => setProbabilidadUsuario(e.target.value)}
                        placeholder="0"
                        className="w-full h-14 px-4 pr-12 text-2xl font-bold text-center rounded-xl border-2 border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground font-semibold">
                        %
                      </span>
                    </div>
                  </div>
                  
                  {/* Harvest button */}
                  <button
                    onClick={handleCosechar}
                    disabled={!probabilidadUsuario}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100"
                  >
                    🌱 COSECHAR
                  </button>
                  
                  {/* Hint */}
                  <p className="text-xs text-muted-foreground text-center">
                    Analiza el cuadro de Punnett para calcular la probabilidad
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                    <Dna className="w-8 h-8 opacity-30" />
                  </div>
                  <p className="text-sm">Selecciona dos plantas compatibles para comenzar</p>
                </div>
              )}
              
              {/* Tips section */}
              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  💡 Consejos
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Los genes en mayúscula (P, R, T) son dominantes</li>
                  <li>• Los genes en minúscula (p, r, t) son recesivos</li>
                  <li>• Un gen dominante siempre se expresa</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Celebration Modal */}
      <Celebration
        show={showCelebration}
        isSuccess={isSuccess}
        message={isSuccess ? "¡Genética Perfecta!" : "¡Casi lo logras!"}
        subMessage={
          isSuccess
            ? "Has dominado este cruce genético. ¡Sigue aprendiendo!"
            : `Recuerda que el gen ${plantaMadre?.genotipo[0].toUpperCase()} domina sobre el ${plantaMadre?.genotipo[0].toLowerCase()}. La respuesta correcta era ${probabilidadCorrecta}%. ¡Inténtalo de nuevo!`
        }
        onClose={() => setShowCelebration(false)}
      />
    </div>
  )
}
