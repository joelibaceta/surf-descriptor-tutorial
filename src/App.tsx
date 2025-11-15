import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Crosshair,
  GridFour,
  Eye,
  ArrowsClockwise,
  MagnifyingGlass,
  CirclesThree,
} from '@phosphor-icons/react'
import { PixelGrid } from '@/components/PixelGrid'
import { HaarWaveletVisualizer } from '@/components/HaarWaveletVisualizer'
import { DescriptorVector } from '@/components/DescriptorVector'
import { OrientationVisualizer } from '@/components/OrientationVisualizer'
import { useKV } from '@github/spark/hooks'

const STEPS = [
  {
    id: 0,
    title: 'Bienvenido al Tutorial SURF',
    icon: MagnifyingGlass,
    color: 'primary',
  },
  {
    id: 1,
    title: 'Detección de Puntos de Interés',
    icon: Crosshair,
    color: 'primary',
  },
  {
    id: 2,
    title: 'Filtros de Caja (Box Filters)',
    icon: GridFour,
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Wavelets de Haar',
    icon: Eye,
    color: 'teal',
  },
  {
    id: 4,
    title: 'Vector Descriptor',
    icon: ArrowsClockwise,
    color: 'accent',
  },
  {
    id: 5,
    title: 'Comparación y Matching',
    icon: CirclesThree,
    color: 'primary',
  },
]

function App() {
  const [currentStep, setCurrentStep] = useKV<number>('surf-current-step', 0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [filterSize, setFilterSize] = useState([4])
  const [threshold, setThreshold] = useState([50])

  const step = currentStep ?? 0
  const progress = (step / (STEPS.length - 1)) * 100

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setCurrentStep(step + 1)
      setIsAnimating(false)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setCurrentStep(step - 1)
      setIsAnimating(false)
    }
  }

  const handleAnimate = () => {
    setIsAnimating(!isAnimating)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsAnimating(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 md:px-12 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            SURF Descriptor
          </h1>
          <p className="text-lg text-muted-foreground">
            Tutorial Interactivo - Aprende paso a paso cómo funciona
          </p>
        </motion.div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progreso: Paso {step + 1} de {STEPS.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-8">
          {STEPS.map((stepItem, index) => {
            const Icon = stepItem.icon
            const isActive = step === index
            const isCompleted = step > index
            
            return (
              <motion.button
                key={stepItem.id}
                onClick={() => setCurrentStep(index)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : isCompleted
                    ? 'border-teal bg-teal/5'
                    : 'border-border bg-card hover:border-muted-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  size={24}
                  className={`mx-auto mb-1 ${
                    isActive
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-teal'
                      : 'text-muted-foreground'
                  }`}
                />
                <span className="text-xs font-medium text-center block">
                  {index + 1}
                </span>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              {step === 0 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MagnifyingGlass size={32} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        ¿Qué es SURF?
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        SURF (Speeded Up Robust Features) es un algoritmo de
                        visión por computadora que detecta y describe puntos
                        característicos en imágenes.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">
                        ¿Para qué sirve?
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Reconocer objetos en diferentes posiciones
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Unir múltiples fotos en panoramas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Seguir objetos en videos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Comparar imágenes similares</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">
                        ¿Cómo funciona?
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary text-primary-foreground">
                            1
                          </Badge>
                          <span className="text-sm">
                            Encuentra puntos únicos en la imagen
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-secondary text-secondary-foreground">
                            2
                          </Badge>
                          <span className="text-sm">
                            Analiza el área alrededor de cada punto
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-teal text-teal-foreground">
                            3
                          </Badge>
                          <span className="text-sm">
                            Crea una "huella digital" de cada punto
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-accent text-accent-foreground">
                            4
                          </Badge>
                          <span className="text-sm">
                            Compara estas huellas entre imágenes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <p className="text-center text-sm text-muted-foreground">
                      💡 <strong>Tip:</strong> No te preocupes por las
                      matemáticas. Este tutorial te mostrará visualmente cada
                      paso para que entiendas la idea principal.
                    </p>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Crosshair size={32} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        Detección de Puntos de Interés
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        El primer paso es encontrar puntos "especiales" en la
                        imagen - esquinas, bordes, o áreas con mucho contraste.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        ¿Qué buscamos?
                      </h3>
                      <p className="text-muted-foreground">
                        Queremos encontrar puntos que sean{' '}
                        <strong>únicos y fáciles de reconocer</strong>, incluso
                        si la imagen se rota, se escala o cambia de iluminación.
                      </p>

                      <div className="space-y-3 mt-6">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-primary rounded-full" />
                            <span className="font-medium">Buenos puntos</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Esquinas de objetos, cambios bruscos de textura,
                            intersecciones
                          </p>
                        </div>

                        <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-destructive rounded-full" />
                            <span className="font-medium">Malos puntos</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Áreas planas sin textura, bordes rectos largos
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <label className="text-sm font-medium mb-3 block">
                          Umbral de detección
                        </label>
                        <Slider
                          value={threshold}
                          onValueChange={setThreshold}
                          max={100}
                          step={1}
                          className="mb-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Valor actual: {threshold[0]} (más alto = menos puntos
                          detectados)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <PixelGrid
                        size={16}
                        highlightRegion={{ x: 6, y: 6, size: Math.max(2, Math.floor((100 - threshold[0]) / 25) + 2) }}
                        threshold={threshold[0]}
                      />
                      <p className="text-sm text-center text-muted-foreground">
                        Puntos detectados: {' '}
                        <span className="text-primary font-medium">
                          {Math.max(1, Math.ceil(Math.max(1, Math.floor((100 - threshold[0]) / 8)) * 0.6))} buenos
                        </span>
                        {' '}/{' '}
                        <span className="text-destructive font-medium">
                          {Math.max(0, Math.max(1, Math.floor((100 - threshold[0]) / 8)) - Math.max(1, Math.ceil(Math.max(1, Math.floor((100 - threshold[0]) / 8)) * 0.6)))} malos
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <GridFour size={32} className="text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        Filtros de Caja (Box Filters)
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Usamos filtros rectangulares que se deslizan sobre la
                        imagen para detectar cambios de intensidad.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        ¿Cómo funcionan?
                      </h3>
                      <p className="text-muted-foreground">
                        El filtro de caja es como una "ventana" que recorre la
                        imagen. Suma los valores de píxeles en diferentes zonas
                        y los compara.
                      </p>

                      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <h4 className="font-medium">Proceso:</h4>
                        <ol className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex gap-2">
                            <span className="font-medium text-primary">
                              1.
                            </span>
                            <span>
                              El filtro se coloca sobre una región de píxeles
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="font-medium text-primary">
                              2.
                            </span>
                            <span>
                              Calcula la diferencia entre áreas claras y
                              oscuras
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="font-medium text-primary">
                              3.
                            </span>
                            <span>Se mueve a la siguiente posición</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="font-medium text-primary">
                              4.
                            </span>
                            <span>Repite el proceso para toda la imagen</span>
                          </li>
                        </ol>
                      </div>

                      <div className="pt-4">
                        <label className="text-sm font-medium mb-3 block">
                          Tamaño del filtro
                        </label>
                        <Slider
                          value={filterSize}
                          onValueChange={setFilterSize}
                          min={2}
                          max={8}
                          step={2}
                          className="mb-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Tamaño: {filterSize[0]}x{filterSize[0]} píxeles
                        </p>
                      </div>

                      <Button
                        onClick={handleAnimate}
                        className="w-full"
                        size="lg"
                      >
                        {isAnimating ? (
                          <>
                            <Pause className="mr-2" /> Pausar Animación
                          </>
                        ) : (
                          <>
                            <Play className="mr-2" /> Ver Filtro en Acción
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <PixelGrid
                        size={16}
                        showFilter={true}
                        filterSize={filterSize[0]}
                        filterPosition={{ x: 0, y: 0 }}
                        animationActive={isAnimating}
                        onAnimationComplete={() => setIsAnimating(false)}
                      />
                      <p className="text-sm text-center text-muted-foreground">
                        El cuadro azul muestra el filtro moviéndose por la
                        imagen
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal/10 rounded-lg">
                      <Eye size={32} className="text-teal" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        Wavelets de Haar
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Calculamos gradientes (cambios) en las direcciones X e Y
                        usando filtros especiales llamados wavelets de Haar.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        ¿Qué son los gradientes?
                      </h3>
                      <p className="text-muted-foreground">
                        Los gradientes nos dicen{' '}
                        <strong>en qué dirección</strong> cambia la intensidad
                        de los píxeles y <strong>qué tan rápido</strong> cambia.
                      </p>

                      <div className="space-y-3">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-4 bg-primary rounded" />
                            <span className="font-medium">
                              Gradiente horizontal (dx)
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Mide cambios de izquierda a derecha. Detecta bordes
                            verticales.
                          </p>
                        </div>

                        <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-4 bg-secondary rounded" />
                            <span className="font-medium">
                              Gradiente vertical (dy)
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Mide cambios de arriba hacia abajo. Detecta bordes
                            horizontales.
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          💡 <strong>Analogía:</strong> Imagina que la imagen
                          es un terreno. Los gradientes son como las pendientes
                          - te dicen hacia dónde y qué tan empinado es el
                          cambio.
                        </p>
                      </div>

                      <Button
                        onClick={handleAnimate}
                        className="w-full"
                        size="lg"
                      >
                        {isAnimating ? (
                          <>
                            <Pause className="mr-2" /> Pausar
                          </>
                        ) : (
                          <>
                            <Play className="mr-2" /> Calcular Gradientes
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <HaarWaveletVisualizer isAnimating={isAnimating} />
                      <p className="text-sm text-center text-muted-foreground">
                        El filtro divide la región en dos: área azul (negativa)
                        y área naranja (positiva)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <ArrowsClockwise size={32} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        Construyendo el Vector Descriptor
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Ahora creamos una "huella digital" única del punto de
                        interés combinando todos los gradientes en un vector.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                          ¿Qué es un descriptor?
                        </h3>
                        <p className="text-muted-foreground">
                          El descriptor es como una "firma" matemática del
                          punto. Es una lista de números que describe las
                          características únicas de esa región.
                        </p>

                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                          <h4 className="font-medium">Pasos de construcción:</h4>
                          <ol className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                              <span className="font-medium text-primary">
                                1.
                              </span>
                              <span>
                                Dividir la región en una cuadrícula de 4x4 (16
                                sub-regiones)
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-medium text-primary">
                                2.
                              </span>
                              <span>
                                En cada sub-región, calcular suma de dx, dy,
                                |dx|, |dy|
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-medium text-primary">
                                3.
                              </span>
                              <span>
                                Esto genera 4 valores por sub-región (16 × 4 =
                                64 valores)
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-medium text-primary">
                                4.
                              </span>
                              <span>
                                Normalizar el vector para que sea independiente
                                de la iluminación
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <OrientationVisualizer
                            angle={45}
                            isAnimating={isAnimating}
                          />
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                          Primero se calcula la orientación dominante del punto
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">
                          Vector Descriptor (64 dimensiones)
                        </h3>
                        <Button onClick={handleAnimate} variant="outline">
                          {isAnimating ? (
                            <>
                              <Pause className="mr-2" size={16} /> Pausar
                            </>
                          ) : (
                            <>
                              <Play className="mr-2" size={16} /> Animar
                            </>
                          )}
                        </Button>
                      </div>

                      <DescriptorVector isAnimating={isAnimating} />

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground text-center">
                          💡 Cada barra representa un valor en el descriptor.
                          Valores positivos (azul) y negativos (naranja)
                          capturan diferentes patrones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <CirclesThree size={32} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">
                        Comparación y Matching
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        El último paso: comparar descriptores entre imágenes
                        para encontrar puntos que coinciden.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                          ¿Cómo comparamos?
                        </h3>
                        <p className="text-muted-foreground">
                          Para saber si dos puntos son el mismo objeto en
                          diferentes imágenes, comparamos sus descriptores usando
                          la <strong>distancia euclidiana</strong>.
                        </p>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">
                            Distancia Euclidiana:
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Es como medir la distancia en línea recta entre dos
                            puntos en un espacio de 64 dimensiones.
                          </p>
                          <div className="bg-card p-3 rounded border font-mono text-sm">
                            distancia = √(Σ(a₁ - b₁)²)
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 bg-primary rounded-full" />
                              <span className="font-medium">Match cercano</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Distancia &lt; umbral → Los puntos probablemente
                              son el mismo objeto
                            </p>
                          </div>

                          <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 bg-destructive rounded-full" />
                              <span className="font-medium">No match</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Distancia &gt; umbral → Los puntos son diferentes
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border">
                          <h4 className="font-semibold mb-4 text-center">
                            Aplicaciones Reales
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                              <span className="text-2xl">📷</span>
                              <div>
                                <p className="font-medium text-sm">
                                  Creación de Panoramas
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Une múltiples fotos encontrando puntos
                                  comunes
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                              <span className="text-2xl">🔍</span>
                              <div>
                                <p className="font-medium text-sm">
                                  Reconocimiento de Objetos
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Identifica objetos en diferentes condiciones
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                              <span className="text-2xl">🎯</span>
                              <div>
                                <p className="font-medium text-sm">
                                  Seguimiento de Objetos
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Rastrea objetos en movimiento en videos
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                              <span className="text-2xl">🤖</span>
                              <div>
                                <p className="font-medium text-sm">
                                  Realidad Aumentada
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Coloca objetos virtuales en el mundo real
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-lg text-center space-y-4">
                      <h3 className="text-2xl font-bold">
                        🎉 ¡Felicitaciones!
                      </h3>
                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Has completado el tutorial de SURF. Ahora entiendes cómo
                        las computadoras "ven" y reconocen características en
                        imágenes.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center pt-4">
                        <Button onClick={handleReset} size="lg" variant="outline">
                          <ArrowsClockwise className="mr-2" />
                          Reiniciar Tutorial
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 gap-4">
          <Button
            onClick={handlePrevious}
            disabled={step === 0}
            variant="outline"
            size="lg"
          >
            <SkipBack className="mr-2" />
            Anterior
          </Button>

          <div className="text-sm text-muted-foreground">
            {STEPS[step]?.title}
          </div>

          <Button
            onClick={handleNext}
            disabled={step === STEPS.length - 1}
            size="lg"
          >
            Siguiente
            <SkipForward className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App