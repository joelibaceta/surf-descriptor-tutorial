import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface PixelGridProps {
  size?: number
  highlightRegion?: { x: number; y: number; size: number }
  showFilter?: boolean
  filterPosition?: { x: number; y: number }
  filterSize?: number
  animationActive?: boolean
  onAnimationComplete?: () => void
  step?: number
}

export function PixelGrid({
  size = 16,
  highlightRegion,
  showFilter = false,
  filterPosition = { x: 0, y: 0 },
  filterSize = 4,
  animationActive = false,
  onAnimationComplete,
  step = 0,
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageData, setImageData] = useState<number[][]>([])

  useEffect(() => {
    const data: number[][] = []
    for (let i = 0; i < size; i++) {
      const row: number[] = []
      for (let j = 0; j < size; j++) {
        const value = Math.random() * 255
        row.push(value)
      }
      data.push(row)
    }
    setImageData(data)
  }, [size])

  useEffect(() => {
    if (!canvasRef.current || imageData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = canvas.width / size
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const value = imageData[i][j]
        ctx.fillStyle = `rgb(${value}, ${value}, ${value})`
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.lineWidth = 0.5
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize)
      }
    }

    if (highlightRegion) {
      const { x, y, size: regionSize } = highlightRegion
      ctx.strokeStyle = 'oklch(0.65 0.18 45)'
      ctx.lineWidth = 3
      ctx.strokeRect(
        x * cellSize,
        y * cellSize,
        regionSize * cellSize,
        regionSize * cellSize
      )
      
      ctx.fillStyle = 'oklch(0.65 0.18 45 / 0.1)'
      ctx.fillRect(
        x * cellSize,
        y * cellSize,
        regionSize * cellSize,
        regionSize * cellSize
      )
    }
  }, [imageData, size, highlightRegion])

  const cellSize = 100 / size

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full rounded-lg border-2 border-border"
      />
      
      {showFilter && (
        <motion.div
          className="absolute border-4 border-primary bg-primary/20 pointer-events-none"
          style={{
            width: `${filterSize * cellSize}%`,
            height: `${filterSize * cellSize}%`,
            left: `${filterPosition.x * cellSize}%`,
            top: `${filterPosition.y * cellSize}%`,
          }}
          animate={animationActive ? {
            x: [`0%`, `${(size - filterSize) * cellSize}%`, `0%`],
            y: [`0%`, `0%`, `${(size - filterSize) * cellSize}%`],
          } : {}}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          onAnimationComplete={onAnimationComplete}
        />
      )}
    </div>
  )
}