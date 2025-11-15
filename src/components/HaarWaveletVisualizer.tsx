import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HaarWaveletVisualizerProps {
  isAnimating?: boolean
}

export function HaarWaveletVisualizer({ isAnimating = false }: HaarWaveletVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [responses, setResponses] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 })

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = 30
    const gridSize = 8
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const value = Math.random() * 255
        ctx.fillStyle = `rgb(${value}, ${value}, ${value})`
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.lineWidth = 1
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize)
      }
    }

    ctx.strokeStyle = 'oklch(0.60 0.12 190)'
    ctx.lineWidth = 3
    const filterSize = 4
    const startX = 2
    const startY = 2
    ctx.strokeRect(startX * cellSize, startY * cellSize, filterSize * cellSize, filterSize * cellSize)

    ctx.fillStyle = 'oklch(0.45 0.15 250 / 0.3)'
    ctx.fillRect(startX * cellSize, startY * cellSize, (filterSize / 2) * cellSize, filterSize * cellSize)
    
    ctx.fillStyle = 'oklch(0.65 0.18 45 / 0.3)'
    ctx.fillRect((startX + filterSize / 2) * cellSize, startY * cellSize, (filterSize / 2) * cellSize, filterSize * cellSize)

    const dx = (Math.random() - 0.5) * 2
    const dy = (Math.random() - 0.5) * 2
    setResponses({ dx, dy })

  }, [isAnimating])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="rounded-lg border-2 border-border"
      />
      
      <div className="flex gap-4">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border"
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm font-medium mono">dx: {responses.dx.toFixed(2)}</span>
        </motion.div>
        
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border"
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm font-medium mono">dy: {responses.dy.toFixed(2)}</span>
        </motion.div>
      </div>
    </div>
  )
}