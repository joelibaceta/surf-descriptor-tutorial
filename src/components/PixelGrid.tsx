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
  threshold?: number
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
  threshold = 50,
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
    
    const totalPoints = Math.max(1, Math.floor((100 - threshold) / 8))
    const goodPoints = Math.max(1, Math.ceil(totalPoints * 0.6))
    const badPoints = Math.max(0, totalPoints - goodPoints)
    
    const goodPositions = [
      { x: 2, y: 2 },
      { x: 10, y: 3 },
      { x: 5, y: 8 },
      { x: 12, y: 11 },
      { x: 1, y: 13 },
      { x: 8, y: 6 },
      { x: 13, y: 8 },
    ]
    
    const badPositions = [
      { x: 7, y: 5 },
      { x: 14, y: 2 },
      { x: 4, y: 14 },
      { x: 11, y: 7 },
      { x: 2, y: 9 },
      { x: 9, y: 12 },
    ]
    
    for (let i = 0; i < Math.min(goodPoints, goodPositions.length); i++) {
      const pos = goodPositions[i]
      ctx.beginPath()
      ctx.arc(
        (pos.x + 0.5) * cellSize,
        (pos.y + 0.5) * cellSize,
        cellSize * 0.35,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = 'oklch(0.45 0.15 250)'
      ctx.fill()
      ctx.strokeStyle = 'oklch(0.98 0 0)'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    
    for (let i = 0; i < Math.min(badPoints, badPositions.length); i++) {
      const pos = badPositions[i]
      ctx.beginPath()
      ctx.arc(
        (pos.x + 0.5) * cellSize,
        (pos.y + 0.5) * cellSize,
        cellSize * 0.35,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = 'oklch(0.577 0.245 27.325)'
      ctx.fill()
      ctx.strokeStyle = 'oklch(0.98 0 0)'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [imageData, size, highlightRegion, threshold])

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
          className="absolute border-4 border-primary bg-primary/20 pointer-events-none rounded-sm"
          style={{
            width: `${filterSize * cellSize}%`,
            height: `${filterSize * cellSize}%`,
            left: `${filterPosition.x * cellSize}%`,
            top: `${filterPosition.y * cellSize}%`,
          }}
          animate={animationActive ? {
            x: [
              '0%',
              `${(size - filterSize) * cellSize}%`,
              `${(size - filterSize) * cellSize}%`,
              '0%',
              '0%',
              `${(size - filterSize) * cellSize}%`,
              `${(size - filterSize) * cellSize}%`,
              '0%'
            ],
            y: [
              '0%',
              '0%',
              `${((size - filterSize) / 2) * cellSize}%`,
              `${((size - filterSize) / 2) * cellSize}%`,
              `${(size - filterSize) * cellSize}%`,
              `${(size - filterSize) * cellSize}%`,
              `${((size - filterSize) / 2) * cellSize}%`,
              `${((size - filterSize) / 2) * cellSize}%`
            ],
          } : {}}
          transition={{
            duration: 6,
            ease: "linear",
            times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1],
          }}
          onAnimationComplete={onAnimationComplete}
        />
      )}
    </div>
  )
}